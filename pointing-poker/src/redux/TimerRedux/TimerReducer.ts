import { TimerStateTypes, TTimer } from './TimerActions';

const timerState: TimerStateTypes = {
  startTime: [2, 30],
  seconds: 30,
  minutes: 2,
  fullSeconds: 150,
};

export const timerReducer = (state = timerState, action: TTimer) => {
  switch (action.type) {
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload as number[] };
    case 'SET_SECONDS':
      return { ...state, seconds: action.payload as number };
    case 'SET_MINUTES':
      return { ...state, minutes: action.payload as number };
    case 'SET_FULL_SECONDS':
      return { ...state, fullSeconds: action.payload as number };
    default:
      return state;
  }
};
