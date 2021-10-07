import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../redux';
import IssueCard from '../components/IssueCard/IssueCard';

describe('IssueCard Component', () => {
  it('IssueCard exist', () => {
    const el = render(
      <Provider store={store}>
        <BrowserRouter>
          <IssueCard
            issueTitle="title"
            issuePriority="low"
            issueID="1"
            current={false}
            isCompleted={false}
          />
        </BrowserRouter>
      </Provider>,
    );
    expect(el).not.toBeNull();
    expect(el.getByTestId('span')).toBeInstanceOf(HTMLElement);
  });
});
