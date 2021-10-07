import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux';
import { timerActions } from '../../redux/TimerRedux/TimerActions';
import { IInputComponentProps } from '../../types/interfaces';
import { StyledTimer } from './StyledTimer';

const InputComponent: FC<IInputComponentProps> = ({ actualCount, setter, count }) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const increaseTime = () => {
    if (count === 1) dispatch(setter(actualCount < 9 ? actualCount + count : 10));
    if (count === 5) dispatch(setter(actualCount < 55 ? actualCount + count : 55));
  };

  const decreaseTime = () => {
    if (count === 1) dispatch(setter(actualCount > 1 ? actualCount - count : 1));
    if (count === 5) dispatch(setter(actualCount > 0 ? actualCount - count : 0));
  };

  return (
    <>
      {location === '/settings' && (
        <>
          <button onClick={increaseTime} className="plus-btn" />
          <button onClick={decreaseTime} className="minus-btn" />
        </>
      )}
    </>
  );
};

const Timer = () => {
  const { setSeconds, setMinutes } = timerActions;
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.timer);
  const isRound = useSelector((store: RootState) => store.gameProcess.startRound);

  useEffect(() => {
    if (isRound) {
      setTimeout(() => {
        if (state.minutes > 0) {
          if (state.seconds > 0) {
            dispatch(setSeconds(state.seconds - 1));
          } else {
            dispatch(setSeconds(59));
            dispatch(setMinutes(state.minutes - 1));
          }
        } else if (state.seconds > 0) {
          dispatch(setSeconds(state.seconds - 1));
        }
      }, 100);
    }
  }, [isRound, state.seconds, state.minutes]);

  return (
    <StyledTimer>
      <section>
        <div>minutes</div>
        <input value={state.minutes} readOnly type="text" />
        <InputComponent setter={setMinutes} actualCount={state.minutes} count={1} />
      </section>
      <div className="points">:</div>
      <section>
        <div>seconds</div>
        <input value={state.seconds} readOnly type="text" />
        <InputComponent actualCount={state.seconds} setter={setSeconds} count={5} />
      </section>
    </StyledTimer>
  );
};

export default Timer;
