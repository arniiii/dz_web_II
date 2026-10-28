import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../src/Card.jsx';

test('Card', () => {
  const dom = <Card />;
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 2', () => {
  const dom = (
    <Card>
      <Card.Title>Title</Card.Title>
    </Card>
  );
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 3', () => {
  const dom = (
    <Card>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>Text</Card.Text>
      </Card.Body>
    </Card>
  );
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 4', () => {
  const dom = (
    <Card>
      <Card.Body>
        <Card.Title>Title 3</Card.Title>
        <Card.Text>Text 3</Card.Text>
      </Card.Body>
    </Card>
  );
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
