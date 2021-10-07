import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../redux';
import ConnectForm from '../components/Forms/ConnectForm';

describe('ConnectForm Component', () => {
  it('onChange work', () => {
    const el = render(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectForm />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.change(el.getByTestId('name-input'), { target: { value: 'Oleg' } });
    expect(el.getByTestId('name-input')).toHaveValue('Oleg');

    fireEvent.change(el.getByTestId('last-name-input'), { target: { value: 'Rabushko' } });
    expect(el.getByTestId('last-name-input')).toHaveValue('Rabushko');

    fireEvent.change(el.getByTestId('job-input'), { target: { value: 'Master' } });
    expect(el.getByTestId('job-input')).toHaveValue('Master');

    expect(el.getByText(/Confirm/i)).toBeInstanceOf(HTMLButtonElement);
    expect(el.getByText(/Cancel/i)).toBeInstanceOf(HTMLButtonElement);
  });

  it('Buttons is exist', () => {
    const el = render(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectForm />
        </BrowserRouter>
      </Provider>,
    );

    expect(el.getByText(/Confirm/i)).toBeInstanceOf(HTMLButtonElement);
    expect(el.getByText(/Cancel/i)).toBeInstanceOf(HTMLButtonElement);
  });
});
