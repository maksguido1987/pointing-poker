import { useDispatch, useSelector } from 'react-redux';
import addPlusImg from '../../assets/icons/plus-add.png';
import { RootState } from '../../redux';
import { showForms } from '../../redux/FormRedux/FormActions';
import { StyledIssueCard, StyledIssueInfo } from './StyledIssueCard';

const AddIssueCard = () => {
  const dispatch = useDispatch();
  const isIssuesForm = useSelector((state: RootState) => state.showForms.isIssuesForm);
  const isDialer = useSelector((state: RootState) => state.personStatus.isDialer);

  const openCreateIssueForm = () => {
    dispatch(showForms.showIssuesForm(!isIssuesForm));
  };

  return (
    <>
      {isDialer && (
        <StyledIssueCard current={false} onClick={openCreateIssueForm}>
          <StyledIssueInfo>
            <span className="issue-card__name">Creat new Issue</span>
          </StyledIssueInfo>
          <img src={addPlusImg} className="plus-img" alt="" />
        </StyledIssueCard>
      )}
    </>
  );
};

export default AddIssueCard;
