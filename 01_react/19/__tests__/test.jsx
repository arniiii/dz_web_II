import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import MarkdownEditor from '../src/MarkdownEditor.jsx';

beforeAll(() => {
  document.createRange = () => ({
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => ({ right: 0 }),
    getClientRects: () => [],
  });

  document.body.innerHTML = '<div id="container"></div>';
});

it('MarkdownEditor', async () => {
  let value;
  const onContentChange = (v) => {
    value = v;
  };

  const container = document.getElementById('container');

  render(<div><MarkdownEditor onContentChange={onContentChange} /></div>, { container });
  const textarea = screen.getByRole('textbox');
  expect(textarea).toBeInTheDocument();

  await userEvent.type(textarea, 'l');
  expect(value).toBe('l');

  await userEvent.type(textarea, 'some text');
  expect(value).toBe('lsome text');

  await userEvent.type(textarea, '1');
  expect(value).toBe('lsome text1');
});
