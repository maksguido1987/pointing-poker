import { FC } from 'react';
import { getInitials, ImageContainer } from '../Avatar/StyledAvatar';
import { StyledUserCardMini } from './StyledUserCardMini';

interface IUserCardMiniProps {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

const UserCardMini: FC<IUserCardMiniProps> = ({ avatar, firstName, lastName }) => {
  return (
    <StyledUserCardMini>
      <ImageContainer background={`url(${avatar})`} className="img-container">
        {avatar === '' && <p className="initials">{getInitials(`${firstName} ${lastName}`)}</p>}
      </ImageContainer>
      <section className="name-block">
        <div className="first-name">{firstName}</div>
        <div>{lastName}</div>
      </section>
    </StyledUserCardMini>
  );
};

export default UserCardMini;
