import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ISwitcherProps } from '../../types/interfaces';
import { StyleSwitcher } from './StyledSwitcher';

const Switcher: FC<ISwitcherProps> = ({ listener, checked }) => {
  const dispatch = useDispatch();

  return (
    <StyleSwitcher checked={checked}>
      <label>
        <input
          className="switcher-input"
          type="checkbox"
          onClick={() => dispatch(listener(!checked))}
        />
        <span></span>
      </label>
    </StyleSwitcher>
  );
};

export default Switcher;
