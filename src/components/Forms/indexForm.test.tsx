import React from 'react';
import IndexForm from "./IndexForm";
import renderer from 'react-test-renderer';
test('IndexForm renders correctly', () => {
  const tree = renderer
    .create(<IndexForm />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});