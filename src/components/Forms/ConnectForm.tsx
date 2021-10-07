import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';

import Button from '../Button/Button';
import Switcher from '../Switcher/Switcher';
import { IConnectForm } from './FormTypes';
import { StyledConnectForm } from './StyledForm';
import { StyledPopupWrapper } from './StyledPopupWrapper';
import { RootState } from '../../redux/index';
import { ImageContainer } from '../Avatar/StyledAvatar';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import { actions } from '../../redux/RolesRedux/RolesActions';
import { setRolePlayers, showForms } from '../../redux/FormRedux/FormActions';
import { StyledInput, StyledLabel } from './StyledFormComponents';
import { createNewGame, createNewUser } from '../../API/RestAPI';
import { addAvatar } from './helper';

const ConnectForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IConnectForm>({ mode: 'onChange' });

  const dispatch = useDispatch();
  const { isConnectForm } = useSelector((state: RootState) => state.showForms);
  const { isDialer, isPlayer, isObserver } = useSelector((state: RootState) => state.personStatus);
  const { avatar } = useSelector((state: RootState) => state.connectAvatar);
  const gameId = useSelector((state: RootState) => state.initial.gameId);
  const history = useHistory();

  const insertNewUser = (
    data: IConnectForm,
    diler: boolean,
    player: boolean,
    observer: boolean,
  ) => {
    if (diler) {
      dispatch(
        createNewGame(data.session, {
          name: data.firstName,
          lastName: data.lastName,
          isDialer: diler,
          isObserver: player,
          isPlayer: observer,
          job: data.job,
          avatar,
        }),
      );
    } else {
      dispatch(
        createNewUser(gameId, {
          name: data.firstName,
          lastName: data.lastName,
          isDialer: diler,
          isObserver: player,
          isPlayer: observer,
          job: data.job,
          avatar,
        }),
      );
    }
  };

  const onSubmit: SubmitHandler<IConnectForm> = (data) => {
    dispatch(showForms.showConnectForm(!isConnectForm));
    if (isDialer) {
      insertNewUser(data, isDialer, isPlayer, isObserver);
      dispatch(setRolePlayers.setConnectFormDialer(data, avatar, nanoid()));
      history.push('/settings');
    }
    if (isPlayer) {
      insertNewUser(data, isDialer, isPlayer, isObserver);
      dispatch(setRolePlayers.setConnectFormPlayer(data, avatar, nanoid()));
      history.push('/settings');
    }
    if (isObserver) {
      insertNewUser(data, isDialer, isObserver, isObserver);
      dispatch(setRolePlayers.setConnectFormObserver(data, avatar, nanoid()));
      history.push('/settings');
    }
    reset();
  };

  const onShowConnectForm = () => {
    dispatch(showForms.showConnectForm(!isConnectForm));
    dispatch(actions.setDealerStatus(false));
    dispatch(actions.setPlayerStatus(false));
    dispatch(actions.setObserverStatus(false));
  };

  return (
    <StyledPopupWrapper onMouseDown={onShowConnectForm}>
      <StyledConnectForm
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="legend-wrapper">
          <legend>Connect to lobby</legend>
          {!isDialer && (
            <div className="switcher-wrapper">
              <p>Connect as observer</p>
              <Switcher checked={isObserver} listener={actions.setObserverStatus} />
            </div>
          )}
        </div>
        <div className="connect-form-wrapper">
          <StyledLabel>
            Your first name:
            <StyledInput
              data-testid="name-input"
              {...register('firstName', { required: true, maxLength: 10 })}
            />
            {errors.firstName && <p className="error">First name is required</p>}
          </StyledLabel>
          <StyledLabel>
            Your last name:
            <StyledInput
              data-testid="last-name-input"
              {...register('lastName', { required: true, maxLength: 10 })}
            />
            {errors.firstName && <p className="error">Last name is required</p>}
          </StyledLabel>
          <StyledLabel>
            Your job position:
            <StyledInput data-testid="job-input" {...register('job')} />
          </StyledLabel>
          {isDialer && (
            <StyledLabel>
              Session name:
              <StyledInput
                data-testid="session-input"
                {...register('session', { required: true, maxLength: 20 })}
              />
              {errors.session && <p className="error">Session name is required</p>}
            </StyledLabel>
          )}
          <div className="input-file-wrapper">
            <label className="upload-label">
              <span>Choose avatar</span>
              <input
                type="file"
                className="upload-input"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => addAvatar(e, dispatch)}
              />
            </label>
          </div>
          <ImageContainer
            data-testid="img-container"
            mainPage
            background={`url(${avatar})`}
            width="83px"
            height="83px"
          />
        </div>
        <div className="connect-buttons-container">
          <Button
            mainPage
            text="Confirm"
            color={whiteColor}
            colorBG={blueColor}
            onClick={() => onSubmit}
          />
          <Button
            mainPage
            colorBG={whiteColor}
            color={blueColor}
            text="Cancel"
            onClick={onShowConnectForm}
          />
        </div>
      </StyledConnectForm>
    </StyledPopupWrapper>
  );
};

export default ConnectForm;
