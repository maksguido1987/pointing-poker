import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { initial } from '../../redux/InitialRedux/InitialActions';
import { IUsers } from '../../types/interfaces';
import UserCard from '../UserCard/UserCard';

const ScramMasterCard = () => {
  const dispatch = useDispatch();
  const users: IUsers = useSelector((state: RootState): IUsers => state.initial.users);

  const dealerId = Object.keys(users)
    .filter((userId: string) => users[userId].isDialer)
    .join();

  useEffect(() => {
    dispatch(initial.setDilerId(dealerId));
  }, [dealerId]);

  return dealerId ? (
    <UserCard
      userID={users[dealerId]._id}
      lastName={users[dealerId].lastName}
      firstName={users[dealerId].name}
      job={users[dealerId].job}
      avatar={users[dealerId].avatar}
      dialer
    />
  ) : null;
};
export default ScramMasterCard;
