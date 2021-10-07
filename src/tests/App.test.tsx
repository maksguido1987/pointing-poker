import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../redux';

describe('App Component', () => {
  const el = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
  it('App  exist', () => {
    expect(el).not.toBeNull();
  });

  it('App renders without crashing', () => {
    const root = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      root,
    );
    ReactDOM.unmountComponentAtNode(root);
  });
});
