import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserById } from '../../API/RestAPI';
import { RootState } from '../../redux';
import { setRolePlayers } from '../../redux/FormRedux/FormActions';
import { sendChoiceForDeleteToAll, sendDeletedUserToAll } from '../../sockets/SocketsAPI';
import { IDeleteUserProps } from '../../types/interfaces';
import Button from '../Button/Button';
import { StyledConnectWrapper } from '../Forms/StyledFormComponents';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import { StyledDeleteUser } from './StyledDeleteUser';

const DeleteUser: FC<IDeleteUserProps> = (props) => {
  const { firstName, lastName, id, setOpenForm } = props;
  const { gameId } = useSelector((store: RootState) => store.initial);

  const deleteUser = () => {
    setOpenForm(false);
    deleteUserById(id);
    sendDeletedUserToAll(id, gameId);
  };

  const cancelDeletion = () => setOpenForm(false);

  return (
    <StyledConnectWrapper onMouseDown={() => setOpenForm(false)}>
      <StyledDeleteUser onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}>
        <h2 className="delete-user-title">Kick player?</h2>
        <p className="delete-user-text">
          Are you really want to remove player <span>{firstName}</span> <span>{lastName}</span> from
          game session?
        </p>
        <div className="connect-buttons-container">
          <Button text="Yes" color={whiteColor} colorBG={blueColor} onClick={deleteUser} />
          <Button colorBG={whiteColor} color={blueColor} text="No" onClick={cancelDeletion} />
        </div>
      </StyledDeleteUser>
    </StyledConnectWrapper>
  );
};

export const DeleteUserMini = () => {
  const { isDeleteModal } = useSelector((store: RootState) => store.dataConnectForm);
  const { gameId } = useSelector((store: RootState) => store.initial);
  const { acceptDeleteUserCount } = useSelector((store: RootState) => store.dataConnectForm);
  const { users, observersCount } = useSelector((store: RootState) => store.initial);
  const allUsers = Object.keys(users).length;
  const dispatch = useDispatch();

  const cancelDeletion = () =>
    dispatch(setRolePlayers.setDeleteModal({ count: false, who: '', whom: '', deleteID: '' }));
  const deleteUser = () => {
    dispatch(setRolePlayers.setDeleteModal({ count: false, who: '', whom: '', deleteID: '' }));
    sendChoiceForDeleteToAll(gameId);
    if (acceptDeleteUserCount > Math.floor(allUsers / 2 - observersCount)) {
      deleteUserById(isDeleteModal.deleteID);
      sendDeletedUserToAll(isDeleteModal.deleteID, gameId);
      dispatch(setRolePlayers.setAcceptCount(0));
    }
  };

  return (
    <StyledConnectWrapper>
      <StyledDeleteUser>
        <h2 className="delete-user-title">Kick player?</h2>
        <p className="delete-user-text">
          <span>{isDeleteModal.who}</span> wants to remove
          <span> {isDeleteModal.whom} </span>from the game session.
        </p>
        <div className="connect-buttons-container">
          <Button text="Yes" color={whiteColor} colorBG={blueColor} onClick={deleteUser} />
          <Button colorBG={whiteColor} color={blueColor} text="No" onClick={cancelDeletion} />
        </div>
      </StyledDeleteUser>
    </StyledConnectWrapper>
  );
};

export default DeleteUser;
