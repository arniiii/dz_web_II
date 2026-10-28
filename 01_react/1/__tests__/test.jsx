import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../src/Card.jsx';

test('Card', () => {
  const component = renderer.create(<Card />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
