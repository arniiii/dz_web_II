import React from 'react';
import renderer from 'react-test-renderer';
import Progress from '../src/Progress.jsx';

test('Progress 1', () => {
  const component = renderer.create(<Progress percentage={25} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Progress 2', () => {
  const component = renderer.create(<Progress percentage={100} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
