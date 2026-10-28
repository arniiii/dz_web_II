import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Products from '../src/Products.jsx';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('check work', async () => {
  const products = [
    {
      name: 'Хлеб', id: 1, price: 25, count: 0,
    },
    {
      name: 'Молоко', id: 2, price: 45, count: 0,
    },
  ];

  const requestHanler = jest.fn((req, res, ctx) => res(ctx.json(products)));

  server.use(rest.get('./products.json', requestHanler));

  await render(<Products />);

  expect(await screen.getByTestId('products')).toBeInTheDocument();

  await waitFor(async () => {
    expect(screen.getByTestId(products[0].id)).toBeInTheDocument();
  });

  await userEvent.click(await screen.getByTestId(`increment-${products[0].id}`));
  await userEvent.click(await screen.getByTestId(`increment-${products[0].id}`));
  await userEvent.click(await screen.getByTestId(`increment-${products[1].id}`));
  await userEvent.click(await screen.getByTestId(`increment-${products[1].id}`));
  await userEvent.click(await screen.getByTestId(`decrement-${products[0].id}`));
  const totalPrice = products[0].price + products[1].price * 2;
  expect(screen.getByText(`Итого цена: ${totalPrice}`)).toBeInTheDocument();

  expect(requestHanler).toHaveBeenCalledTimes(1);
});
