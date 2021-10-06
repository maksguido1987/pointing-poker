import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import cancelImg from '../../assets/icons/Vector-cancel.png';
import { RootState } from '../../redux';
import { sendOpenDeleteFormToAll } from '../../sockets/SocketsAPI';
import { getInitials, ImageContainer } from '../Avatar/StyledAvatar';
import DeleteUser, { DeleteUserMini } from '../DeletePlayer/DeleteUser';
import { IConnectForm } from '../Forms/FormTypes';
import { StyledUserCard, StyledUserInfo, ExcludeBtn } from './StyledUserCard';

const UserCard: FC<IConnectForm> = ({ firstName, lastName, job, avatar, userID, dialer }) => {
  const [openForm, setOpenForm] = useState(false);
  const { isDialer, isPlayer, isObserver } = useSelector((state: RootState) => state.personStatus);
  const { users, currUserID, gameId, dealerId } = useSelector((state: RootState) => state.initial);
  const isDeleteModal = useSelector(
    (state: RootState) => state.dataConnectForm.isDeleteModal.count,
  );
  const usersLength = Object.keys(users).length;

  const openDeleteFormToAll = () => {
    sendOpenDeleteFormToAll(users[currUserID].name, users[userID].name, userID, gameId);
  };

  return (
    <>
      <StyledUserCard className="user-card">
        <ImageContainer background={`url(${avatar})`} className="img-container">
          {avatar === '' && <p className="initials">{getInitials(`${firstName} ${lastName}`)}</p>}
        </ImageContainer>
        <StyledUserInfo>
          <span className="card-user-name">
            {firstName} {lastName}
          </span>
          <span className="card-user-position">{job}</span>
        </StyledUserInfo>
        {(isDialer || (usersLength > 3 && isPlayer)) && !dialer && (
          <ExcludeBtn>
            <img
              src={cancelImg}
              onClick={() => (dealerId === currUserID ? setOpenForm(true) : openDeleteFormToAll())}
              alt="exclude button"
            />
          </ExcludeBtn>
        )}
        {openForm && (
          <DeleteUser
            setOpenForm={setOpenForm}
            firstName={firstName}
            lastName={lastName}
            id={userID}
          />
        )}
        {isDeleteModal && !isObserver && <DeleteUserMini />}
      </StyledUserCard>
    </>
  );
};

export default UserCard;
