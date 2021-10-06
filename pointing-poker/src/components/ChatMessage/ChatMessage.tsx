import { IMsg, IUsers } from '../../types/interfaces';
import { vME, vOTHERS } from '../../types/globalVariables';
import { StyledMsg } from './StyledChatMsg';
import { ImageContainer } from '../Avatar/StyledAvatar';

interface IChatMessageProps {
  users: IUsers;
  currUserID: string;
  msgData: IMsg;
}

const ChatMessage = ({
  msgData: { _id, user_id, text, time },
  currUserID,
  users,
}: IChatMessageProps): JSX.Element => {
  const msgSender = users[user_id];

  return (
    <StyledMsg key={_id} viewType={user_id === currUserID ? vME : vOTHERS}>
      <ImageContainer className="avatar-chat">
        {msgSender.avatar.length ? (
          <img src={msgSender.avatar} className="" alt="avatar" />
        ) : (
          <p className="initials">{msgSender.name.slice(0, 1)}</p>
        )}
      </ImageContainer>
      <div className="text-bubble">
        <div className="msg-txt">
          <div className="chat-username">{msgSender.name}</div>
          <div className="msg">{text}</div>
          <span className="msg-info">{time}</span>
        </div>
      </div>
    </StyledMsg>
  );
};

export default ChatMessage;
