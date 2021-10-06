import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { StyledIssuesSection } from './StyledIssuesSection';
import AddIssueCard from '../IssueCard/AddIssueCard';
import IssueCard from '../IssueCard/IssueCard';
import { RootState } from '../../redux';
import { issueForm } from '../../redux/FormRedux/FormActions';

const IssuesSection = () => {
  const { issueCards, elemIndex } = useSelector((state: RootState) => state.issueFormData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (issueCards[elemIndex])
      dispatch(issueForm.toggleCurrentIssueCard(issueCards[elemIndex].issueID));
  }, [issueCards.length, elemIndex]);

  const createIssueCards = issueCards.map((card) => {
    return (
      <IssueCard
        key={card.issueID}
        current={card.current}
        issueTitle={card.issueTitle}
        issuePriority={card.issuePriority}
        issueID={card.issueID}
        isCompleted={card.isCompleted}
      />
    );
  });

  return (
    <StyledIssuesSection>
      <div className="text issue-game-page">Issues:</div>
      <div className="issue-cards-section">
        {createIssueCards}
        <AddIssueCard />
      </div>
    </StyledIssuesSection>
  );
};

export default IssuesSection;
