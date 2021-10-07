import { useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { StyledChatBox, StyledChatWindow } from './StyledChat';
import { IMsg } from '../../types/interfaces';
import { chat } from '../../redux/ChatRedux/ChatActions';
import ChatMessage from '../ChatMessage/ChatMessage';
import ChatInput from '../ChatInput/ChatInput';
import { sendMsgToAll } from '../../sockets/SocketsAPI';
import { RootState } from '../../redux';
import { mouseDown, mouseMove, mouseUp } from './helper';

const Chat = () => {
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [isMouseDown, setMouseDown] = useState(false);
  const location = useLocation().pathname;
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const chatIsOpen = useSelector((store: RootState) => store.chat.isOpen);
  const txtRef = useRef<HTMLDivElement>(null);
  const { gameId, msgs, currUserID, users } = useSelector((state: RootState) => ({
    gameId: state.initial.gameId,
    currUserID: state.initial.currUserID,
    msgs: state.chat.msgs,
    users: state.initial.users,
  }));

  const sendMsgToServer = (msgContent: IMsg) => {
    sendMsgToAll(msgContent);
    setMsg('');
    if (txtRef.current) txtRef.current.innerText = '';
  };

  const submitMsg = () => {
    const sendTime = new Date();
    const decimalLen = 2;
    sendMsgToServer({
      game_id: `${gameId}`,
      user_id: currUserID,
      text: msg,
      time: `${sendTime.getHours()}:${
        sendTime.getMinutes().toString().length < decimalLen
          ? `0${sendTime.getMinutes()}`
          : sendTime.getMinutes()
      }`,
    });
  };

  const closeChat = () => dispatch(chat.setOpenChat(false));

  return (
    <>
      {location !== '/' && location !== '/results' && (
        <StyledChatBox
          chatIsOpen={chatIsOpen}
          onMouseDown={() => mouseDown(setMouseDown)}
          onMouseMove={(e) =>
            mouseMove(e, setMouseDown, setPointX, setPointY, pointX, pointY, isMouseDown, 550, 400)
          }
          onMouseUp={(e) => mouseUp(e, setMouseDown)}
        >
          <section className="header">
            <button onClick={closeChat} />
          </section>
          <StyledChatWindow>
            {msgs.map((msgData: IMsg, msgIndex) => (
              <ChatMessage key={msgIndex} users={users} currUserID={currUserID} msgData={msgData} />
            ))}
          </StyledChatWindow>
          <ChatInput submitMsg={submitMsg} setMsg={setMsg} txtRef={txtRef} />
        </StyledChatBox>
      )}
    </>
  );
};

export default Chat;
