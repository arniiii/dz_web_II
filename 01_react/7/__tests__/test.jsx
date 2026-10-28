import React from 'react';

import { test, expect } from '@jest/globals';

import renderer from 'react-test-renderer';
import ListGroup from '../src/ListGroup.jsx';

test('ListGroup 1', () => {
  const dom = (
    <ListGroup>
      <p>one</p>
      <p>two</p>
    </ListGroup>
  );

  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListGroup 2', () => {
  const dom = (
    <ListGroup>
      <a href="google">google</a>
      <a href="yandex">yandex</a>
      <a href="mail">mail</a>
    </ListGroup>
  );

  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
