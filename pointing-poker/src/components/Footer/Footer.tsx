import { StyleFooter } from './StyledFooter';
import rsIco from '../../assets/icons/rs-ico.svg';

const Footer = () => {
  return (
    <StyleFooter>
      <ul>
        <li>
          <a href="https://github.com/maksguido1987">Maksguido1987</a>
        </li>
        <li>
          <a href="https://github.com/SaXaPhonist">SaXaPhonist</a>
        </li>
        <li>
          <a href="https://github.com/OlegRabushko">OlegRabushko</a>
        </li>
      </ul>
      <div> 2021</div>
      <img src={rsIco} alt="ico" />
    </StyleFooter>
  );
};

export default Footer;
