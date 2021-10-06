import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { StyleLobbyHeaderSection } from './StyledLobbyHeaderSection';

const LobbyHeaderSection = () => {
  const sessionName = useSelector((state: RootState) => state.initial.gameTitle);

  return (
    <StyleLobbyHeaderSection>
      <div className="header-text">{sessionName}</div>
    </StyleLobbyHeaderSection>
  );
};

export default LobbyHeaderSection;
