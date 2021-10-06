import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cards from '../../assets/icons/cards-ico.svg';
import { RootState } from '../../redux';
import { setAvatar, showForms } from '../../redux/FormRedux/FormActions';
import { initial } from '../../redux/InitialRedux/InitialActions';
import { actions } from '../../redux/RolesRedux/RolesActions';
import Button from '../Button/Button';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import { StyleMainPage } from './StyledMainPage';

const MainPage = () => {
  const dispatch = useDispatch();
  const { isConnectForm } = useSelector((state: RootState) => state.showForms);
  const check = useSelector((state: RootState) => state.gameProcess.check);

  const handlerDealerState = () => {
    dispatch(showForms.showConnectForm(!isConnectForm));
    dispatch(actions.setDealerStatus(true));
    dispatch(setAvatar(''));
  };

  const handlerPlayerState = () => {
    dispatch(showForms.showConnectForm(!isConnectForm));
    dispatch(actions.setPlayerStatus(true));
    dispatch(setAvatar(''));
  };

  const setGameKey = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(initial.setGameId(e.currentTarget.value));
  };

  return (
    <StyleMainPage>
      <section className="header">
        <img src={cards} alt="" />
        <div className="poker">Poker</div>
        <div className="strip"></div>
        <div className="planning">Planing</div>
      </section>
      <div>
        {check.map((el) => (
          <div key={el}>{el.title}</div>
        ))}
      </div>
      <section className="body">
        <div>Start your planning</div>
        <div className="flex-box">
          <p>Create session:</p>
          <Button
            color={whiteColor}
            mainPage
            colorBG={blueColor}
            text=" Start new game"
            onClick={handlerDealerState}
          />
        </div>
        <div>OR:</div>
        <p className="connect__text">
          Connect to lobby by <b style={{ color: '#66999B' }}>URL</b>:
        </p>
        <div className="flex-box">
          <input className="started-page-url" onInput={(e) => setGameKey(e)} />
          <Button
            color={whiteColor}
            mainPage
            colorBG={blueColor}
            borderRadius="0 3px 3px 0"
            text="Connect"
            onClick={handlerPlayerState}
          />
        </div>
      </section>
    </StyleMainPage>
  );
};

export default MainPage;
