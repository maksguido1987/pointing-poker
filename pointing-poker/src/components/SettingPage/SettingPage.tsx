import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MembersSection from '../MembersSection/MembersSection';
import SettingsSection from '../SettingsSection/SettingsSection';
import LobbyHeaderSection from '../LobbyHeaderSection/LobbyHeaderSection';
import ScramMasterSection from '../ScramMasterSection/ScramMasterSection';
import CardValuesSection from '../CardValuesSection/CardValuesSection';
import { StyledSettingPage } from './StyledSettingPage';
import IssuesSection from '../IssuesSection/issuesSection';
import { RootState } from '../../redux';
import {
  receivedChoiceForDelete,
  receivedOpenDeleteForm,
  receivedRenameIssues,
  receiveIsObserver,
  sendIsObserver,
} from '../../sockets/SocketsAPI';

const SettingPage = () => {
  const isDialer = useSelector((store: RootState) => store.personStatus.isDialer);
  const { gameId, users } = useSelector((store: RootState) => store.initial);
  const usersLength = Object.keys(users).length;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDialer) {
      let count = 0;
      Object.entries(users).forEach((el) => {
        if (el[1].isObserver && el[1].isPlayer) count += 1;
      });
      sendIsObserver(count, gameId);
    }
  }, [usersLength]);

  useEffect(() => {
    receivedRenameIssues(dispatch);
    receivedOpenDeleteForm(dispatch);
    receivedChoiceForDelete(dispatch);
    receiveIsObserver(dispatch);
  }, []);

  return (
    <StyledSettingPage>
      <LobbyHeaderSection />
      <ScramMasterSection />
      <MembersSection />
      {isDialer && (
        <>
          <IssuesSection />
          <SettingsSection />
          <CardValuesSection />
        </>
      )}
    </StyledSettingPage>
  );
};

export default SettingPage;
