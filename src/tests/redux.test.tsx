import '@testing-library/jest-dom/extend-expect';
import { TSettings } from '../redux/SettingsSectionRedux/SettingsSectionActions';
import { lobbySettingsReducer } from '../redux/SettingsSectionRedux/SettingsSectionReducer';

describe('Redux - SettingSectionReducer', () => {
  const state = {
    scramMasterAsPlayer: true,
    timerNeeded: true,
    coffeeCardNeeded: true,
    questionCardNeeded: false,
    sequenceType: 'Fibonacci',
  };

  it('scramMasterAsPlayer should be false', () => {
    const action: TSettings = { type: 'SET_SCRAM_MASTER_ROLE', payload: false };
    const newState = lobbySettingsReducer(state, action);
    expect(newState.scramMasterAsPlayer).toBe(false);
  });

  it('timerNeeded should be false', () => {
    const action: TSettings = { type: 'SET_TIMER', payload: false };
    const newState = lobbySettingsReducer(state, action);
    expect(newState.timerNeeded).toBe(false);
  });

  it('coffeeCardNeeded should be true', () => {
    const action: TSettings = { type: 'SET_COFFEE_CARD', payload: true };
    const newState = lobbySettingsReducer(state, action);
    expect(newState.coffeeCardNeeded).toBe(true);
  });

  it('coffeeCardNeeded should be true', () => {
    const action: TSettings = { type: 'SET_QUESTION_CARD', payload: true };
    const newState = lobbySettingsReducer(state, action);
    expect(newState.questionCardNeeded).not.toBe(false);
  });

  it('sequenceType should be "test"', () => {
    const action: TSettings = { type: 'SET_SEQUENCE_TYPE', payload: 'test' };
    const newState = lobbySettingsReducer(state, action);
    expect(newState.sequenceType).toBe('test');
  });
});
