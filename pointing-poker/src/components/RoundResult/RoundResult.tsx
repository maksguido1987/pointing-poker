import { FC } from 'react';
import { useSelector } from 'react-redux';
import PlayerDecision from '../PlayerDecision/PlayerDecision';
import { StyledRoundResult } from './StyledRoundResult';
import { RootState } from '../../redux';
import UserCardMini from '../UserCardMini/UserCardMini';
import selectedIco from '../../assets/icons/selected.png';
import { IRoundResultProps, IUserInfo } from '../../types/interfaces';

const RoundResult: FC<IRoundResultProps> = ({ setShowResults }) => {
  const playerIsDealer = useSelector((store: RootState) => store.settings.scramMasterAsPlayer);
  const { users, dealerId } = useSelector((store: RootState) => store.initial);
  const userIsSelectedCard = useSelector((store: RootState) => store.card.userSelectedCard);
  const allUsers = Object.entries(users);

  const UserResultCard: FC<{ el: [string, IUserInfo]; i: number }> = ({ el, i }) => {
    return (
      <>
        <div key={i} className="flex-box">
          {userIsSelectedCard[el[1]._id] && <img src={selectedIco} alt="ico" />}
          {!el[1].isPlayer && !userIsSelectedCard[el[1]._id] && (
            <PlayerDecision decision="in progress" />
          )}
          {el[1].isPlayer && <PlayerDecision decision="Observer" />}
          <UserCardMini
            id={el[1]._id}
            firstName={el[1].name}
            lastName={el[1].lastName}
            avatar={el[1].avatar}
          />
        </div>
      </>
    );
  };

  return (
    <StyledRoundResult>
      <div className="full-container">
        <div className="top-text">
          <div>Decision:</div>
          <div className="text">Players:</div>
          <button onClick={() => setShowResults!(false)} />
        </div>
        <div className="container">
          {allUsers.map((el, i) => {
            if (playerIsDealer) return <UserResultCard key={i} el={el} i={i} />;
            if (!playerIsDealer)
              return <>{el[0] !== dealerId && <UserResultCard key={i} el={el} i={i} />}</>;

            return el;
          })}
        </div>
      </div>
    </StyledRoundResult>
  );
};

export default RoundResult;
