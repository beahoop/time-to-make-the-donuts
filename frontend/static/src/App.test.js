import { render, screen } from '@testing-library/react';
import App from './App';

// https://reactjs.org/docs/testing-recipes.html

// https://reactjs.org/docs/testing-recipes.html#data-fetching

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// beforeEach()
// and
// afterEach()
// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });
//
// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });
