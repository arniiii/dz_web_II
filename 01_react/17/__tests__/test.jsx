import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Autocomplete from '../src/Autocomplete.jsx';

const server = setupServer(
  rest.get('/countries', (req, res, ctx) => {
    const query = req.url.searchParams.get('term');

    switch (query) {
      case 'a':
        return res(
          ctx.status(200),
          ctx.json(['afghanistan', 'albania', 'algeria']),
        );
      case 'al':
        return res(
          ctx.status(200),
          ctx.json(['albania', 'algeria']),
        );
      case 'alb':
        return res(
          ctx.status(200),
          ctx.json(['albania']),
        );
      case '':
        return res(
          ctx.status(200),
          ctx.json(['afghanistan', 'albania', 'algeria']),
        );
      default:
        throw new Error(`No match for query ${query}`);
    }
  }),
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error( // eslint-disable-line no-console
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });
});

afterAll(() => {
  server.close();
});

it('Autocomplete', async () => {
  render(<Autocomplete />);

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'a');

  const result1 = await screen.findByRole('list');
  expect(result1).toContainElement(screen.getByText('afghanistan'));
  expect(result1).toContainElement(screen.getByText('albania'));
  expect(result1).toContainElement(screen.getByText('algeria'));

  await userEvent.type(input, 'l');

  const result2 = await screen.findByRole('list');

  await waitFor(() => {
    expect(result2).not.toContainElement(screen.queryByText('afghanistan'));
  });
  expect(result2).toContainElement(screen.getByText('albania'));
  expect(result2).toContainElement(screen.getByText('algeria'));

  await userEvent.type(input, 'b');
  const result3 = await screen.findByRole('list');
  await waitFor(() => {
    expect(result3).not.toContainElement(screen.queryByText('afghanistan'));
  });
  await waitFor(() => {
    expect(result3).not.toContainElement(screen.queryByText('algeria'));
  });
  expect(result3).toContainElement(screen.getByText('albania'));

  await userEvent.clear(input);

  expect(input).toHaveValue('');
  const result4 = screen.queryByRole('list');
  expect(result4).not.toBeInTheDocument();
});
