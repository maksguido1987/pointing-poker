import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { chat } from '../../redux/ChatRedux/ChatActions';
import { initial } from '../../redux/InitialRedux/InitialActions';
import { HeaderStyled, IconStyled, ChatIcoStyled, MiniGameIcoStyled } from './StyledHeader';

export default function Header() {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const openChat = () => dispatch(chat.setOpenChat(true));
  const openMiniGame = () => dispatch(initial.setMiniGame(true));

  return (
    <HeaderStyled>
      {location !== '/' && location !== '/results' && (
        <MiniGameIcoStyled onClick={openMiniGame}>
          <p>
            Play! If you are tired of boring assessments or too lazy to correspond with
            colleagues☻☺☻
          </p>
        </MiniGameIcoStyled>
      )}
      {location !== '/' && location !== '/results' && <ChatIcoStyled onClick={openChat} />}
      <IconStyled />
    </HeaderStyled>
  );
}
