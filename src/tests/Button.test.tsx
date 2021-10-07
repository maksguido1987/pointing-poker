import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux';
import Button from '../components/Button/Button';

const onClick = jest.fn();

describe('Button Component', () => {
  it('Button exist', () => {
    const el = render(
      <Provider store={store}>
        <BrowserRouter>
          <Button onClick={onClick} text="Click" color="black" colorBG="white" />
        </BrowserRouter>
      </Provider>,
    );

    expect(el).not.toBeNull();
    expect(el.getByText(/Click/i)).toBeInstanceOf(HTMLButtonElement);
  });

  it('onClick work', () => {
    const el = render(
      <Provider store={store}>
        <BrowserRouter>
          <Button onClick={onClick} text="Click" color="black" colorBG="white" />
        </BrowserRouter>
      </Provider>,
    );

    expect(onClick).toBeCalledTimes(0);
    fireEvent.click(el.getByText(/Click/i));
    expect(onClick).toBeCalledTimes(1);
  });
});
