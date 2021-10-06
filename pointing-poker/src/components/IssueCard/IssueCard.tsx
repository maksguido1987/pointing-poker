import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useState, useEffect } from 'react';
import pencil from '../../assets/icons/edit_pencil.svg';
import deleteImg from '../../assets/icons/delete_basket.png';
import { StyledIssueCard, StyledIssueInfo } from './StyledIssueCard';
import { RootState } from '../../redux';
import { IIssueCard } from '../Forms/FormTypes';
import { issueForm } from '../../redux/FormRedux/FormActions';
import { sendDeletedIssuesToAll, sendRenameIssueToAll } from '../../sockets/SocketsAPI';

const IssueCard: FC<IIssueCard> = ({
  issueTitle,
  issuePriority,
  issueID,
  current,
  isCompleted,
}) => {
  const { register, handleSubmit, reset } = useForm<IIssueCard>({ mode: 'onChange' });
  const dispatch = useDispatch();
  const isDialer = useSelector((state: RootState) => state.personStatus.isDialer);
  const [isUpdateIssueTitle, setUpdateIssueTitle] = useState<boolean>(false);
  const location = useLocation().pathname;
  const cards = useSelector((state: RootState) => state.issueFormData.issueCards);
  const { seconds, minutes } = useSelector((state: RootState) => state.timer);
  const { timerNeeded, scramMasterAsPlayer } = useSelector((state: RootState) => state.settings);
  const playersCheckedCard = useSelector((store: RootState) => store.card.count);
  const { users, observersCount, gameId } = useSelector((store: RootState) => store.initial);
  const allUsersLength = Object.keys(users).length;

  useEffect(() => {
    if (
      (timerNeeded && seconds === 0 && minutes === 0) ||
      (!timerNeeded &&
        scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - observersCount) ||
      (!timerNeeded &&
        !scramMasterAsPlayer &&
        playersCheckedCard === allUsersLength - 1 - observersCount)
    ) {
      cards.forEach((el) => {
        if (el.current) {
          dispatch(issueForm.setCompletedIssueCard({ id: el.issueID, count: true }));
        }
      });
    }
  }, [seconds, minutes, playersCheckedCard]);

  const onSubmit: SubmitHandler<IIssueCard> = (data) => {
    sendRenameIssueToAll(data, issueID, gameId);
    setUpdateIssueTitle(false);
    reset();
  };

  const handleEditBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpdateIssueTitle(true);
  };

  const handleDeleteBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    sendDeletedIssuesToAll(issueID, gameId);
  };

  return (
    <StyledIssueCard current={location !== '/settings' && current}>
      <StyledIssueInfo>
        {isUpdateIssueTitle ? (
          <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="upd-issue-card-title"
              defaultValue={issueTitle}
              {...register('issueTitle', { maxLength: 30 })}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            />
            <select
              className="upd-issue-card-priority"
              {...register('issuePriority')}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <option value="Low">Low</option>
              <option value="Middle">Middle</option>
              <option value="Hight">Hight</option>
            </select>
          </form>
        ) : (
          <>
            <span className="issue-card-name">{issueTitle}</span>
            <span className="issue-card-prior">{issuePriority} priority</span>
            {isCompleted && <div className="selected-card-skin" />}
          </>
        )}
      </StyledIssueInfo>
      {isDialer && (
        <div className="edit-wrapper">
          {location === '/settings' && (
            <img src={pencil} alt="edit" className="edit-img" onClick={handleEditBtn} />
          )}
          {!isCompleted && (
            <img src={deleteImg} alt="delete" className="delete-img" onClick={handleDeleteBtn} />
          )}
        </div>
      )}
    </StyledIssueCard>
  );
};

export default IssueCard;
