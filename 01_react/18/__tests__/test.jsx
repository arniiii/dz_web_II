import React from 'react';
import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TodoBox from '../src/TodoBox.jsx';

const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

test('TodoBox 1', async () => {
  const scope = nock(host)
    .get('/api/tasks')
    .reply(200, []);

  render(<TodoBox />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  const submitBtn = screen.getByRole('button', { name: 'add' });
  expect(submitBtn).toBeInTheDocument();

  await waitFor(() => {
    const requestIsPerformed = scope.isDone();
    expect(requestIsPerformed).toBe(true);
  });

  nock(host)
    .post('/api/tasks', {
      text: 'new task',
    })
    .reply(200, { id: 1, state: 'active', text: 'new task' });

  await userEvent.type(input, 'new task');
  await userEvent.click(submitBtn);

  expect(await screen.findByRole('link', { name: 'new task' })).toBeInTheDocument();

  nock(host)
    .post('/api/tasks', {
      text: 'new task 2',
    })
    .reply(200, { id: 2, state: 'active', text: 'new task 2' });

  await userEvent.type(input, 'new task 2');
  await userEvent.click(submitBtn);

  expect(await screen.findByRole('link', { name: 'new task' })).toBeInTheDocument();
  expect(await screen.findByRole('link', { name: 'new task 2' })).toBeInTheDocument();
});

test('TodoBox 2', async () => {
  const tasks = [
    { id: 2, text: 'task 2', state: 'finished' },
    { id: 1, text: 'task 1', state: 'active' },
  ];
  const scope = nock(host)
    .get('/api/tasks')
    .reply(200, tasks);

  const { asFragment, container } = render(<TodoBox />);

  await waitFor(() => {
    const requestIsPerformed = scope.isDone();
    expect(requestIsPerformed).toBe(true);
  });
  expect(asFragment()).toMatchSnapshot();

  const activeTask = await screen.findByRole('link', { name: 'task 1' });

  const scope2 = nock(host)
    .patch(`/api/tasks/${tasks[1].id}/finish`)
    .reply(200, () => ({ ...tasks[1], state: 'finished' }));

  await userEvent.click(activeTask);

  await waitFor(() => {
    const requestIsPerformed = scope2.isDone();
    expect(requestIsPerformed).toBe(true);
    expect(container.getElementsByClassName('todo-finished-tasks')[0]).toHaveTextContent('task 1');
  });
  expect(asFragment()).toMatchSnapshot();

  const finishedTask = await screen.findByRole('link', { name: 'task 2' });
  const scope3 = nock(host)
    .patch(`/api/tasks/${tasks[0].id}/activate`)
    .reply(200, { ...tasks[0], state: 'active' });

  await userEvent.click(finishedTask);

  await waitFor(() => {
    const requestIsPerformed = scope3.isDone();
    expect(requestIsPerformed).toBe(true);
    expect(container.getElementsByClassName('todo-active-tasks')[0]).toHaveTextContent('task 2');
  });
  expect(asFragment()).toMatchSnapshot();
});
