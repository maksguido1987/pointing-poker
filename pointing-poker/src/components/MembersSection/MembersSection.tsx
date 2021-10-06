import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { StyledMembers } from './StyledMembers';
import UserCard from '../UserCard/UserCard';
import { RootState } from '../../redux';
import { getAllUsers } from '../../API/RestAPI';

const MembersSection = () => {
  const { users, gameId } = useSelector((state: RootState) => ({
    users: state.initial.users,
    gameId: state.initial.gameId,
  }));

  useEffect(() => {
    getAllUsers(gameId);
  });

  return (
    <StyledMembers>
      <div className="text">Members: </div>
      <div className="flex-box">
        {Object.keys(users).map((user) => {
          if (users[user].isPlayer || users[user].isObserver) {
            return (
              <UserCard
                key={users[user]._id}
                userID={users[user]._id}
                firstName={users[user].name}
                lastName={users[user].lastName}
                job={users[user].job}
                avatar={users[user].avatar}
              />
            );
          }
          return null;
        })}
      </div>
    </StyledMembers>
  );
};

export default MembersSection;
