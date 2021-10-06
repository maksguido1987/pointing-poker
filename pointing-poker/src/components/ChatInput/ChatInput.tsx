import { StyledChatInput } from './StyledChatInput';
import sendImg from '../../assets/icons/send-icon.svg';
import { IChatInputProps } from '../../types/interfaces';

const ChatInput = ({ setMsg, submitMsg, txtRef }: IChatInputProps) => {
  return (
    <StyledChatInput>
      <div className="input-wrapper">
        <div
          contentEditable="true"
          role="textbox"
          data-placeholder="Message"
          className="text-input"
          ref={txtRef}
          onInput={(e: React.KeyboardEvent<HTMLDivElement>) =>
            setMsg((e.target as HTMLInputElement).innerText)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            e.key === 'Enter' && !e.shiftKey ? (submitMsg(), e.preventDefault()) : null
          }
          tabIndex={-1}
        />
        <div role="button" onClick={() => submitMsg()} className="send-btn-container" tabIndex={0}>
          <img src={sendImg} alt="send message" className="send-btn-img" />
        </div>
      </div>
    </StyledChatInput>
  );
};

export default ChatInput;
