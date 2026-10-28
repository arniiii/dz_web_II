import React from 'react';
import renderer from 'react-test-renderer';
import DefinitionsList from '../src/DefinitionsList.jsx';

test('Definitions 1', () => {
  const definitions = [
    { dt: 'one', dd: 'two', id: 1 },
    { dt: 'another term', dd: 'another description', id: 2 },
  ];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Definitions 2', () => {
  const definitions = [
    { dt: 'one', dd: 'two', id: 1 },
  ];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Definitions 3', () => {
  const definitions = [
    { dt: 'another term', dd: 'another description', id: 1 },
    { dt: 'one', dd: 'two', id: 2 },
  ];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Definitions 4', () => {
  const definitions = [];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});