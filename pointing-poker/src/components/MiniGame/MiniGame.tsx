import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledMiniGame, StyledWin, StyledFail } from './StyledMiniGame';
import refreshIco from '../../assets/icons/refresh-ico.svg';
import { randomWord, words } from './helper';
import { mouseDown, mouseMove, mouseUp } from '../Chat/helper';
import { RootState } from '../../redux';
import { initial } from '../../redux/InitialRedux/InitialActions';

const MiniGame = () => {
  const [actualWord, setActualWord] = useState(words[randomWord()]);
  const [inputWord, setInputWord] = useState('');
  const [winChecker, setWinChecker] = useState<boolean | string>(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [trueCount, setTrueCount] = useState(1);
  const [falseCount, setFalseCount] = useState(1);
  const [timer, setTimer] = useState(0);
  const [pointX, setPointX] = useState(0);
  const [pointY, setPointY] = useState(0);
  const [isMouseDown, setMouseDown] = useState(false);
  const dispatch = useDispatch();
  const gameIsOpen = useSelector((store: RootState) => store.gameProcess.miniGame);

  const mixLetters = useMemo(() => {
    const newWord = actualWord
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
    if (newWord !== actualWord) return newWord;
    if (newWord === actualWord) return actualWord.split('').reverse().join('');
    return '';
  }, [actualWord, isAnswer]);

  const changeWord = () => setActualWord(words[randomWord()]);

  useEffect(() => {
    if (timer > 0) setTimeout(() => setTimer(timer - 1), 1000);
    if (timer === 0) {
      setIsAnswer(false);
      changeWord();
    }
  }, [timer]);

  const refreshWord = () => {
    changeWord();
    setTrueCount(1);
    setScore((prev) => (prev > 0 ? prev - 10 * falseCount : 0));
    setInputWord('');
  };

  const setAnswer = () => {
    if (inputWord.toLowerCase() === actualWord.toLowerCase()) {
      setWinChecker('win');
      setFalseCount(1);
      setTrueCount((prev) => prev + 1);
      setScore((prev) => prev + 10 * trueCount);
      setTimeout(() => changeWord(), 3000);
    } else {
      setTrueCount(1);
      setFalseCount((prev) => prev + 1);
      setScore((prev) => (prev > 0 ? prev - 5 * falseCount : 0));
      setWinChecker('fail');
    }
    setTimeout(() => setWinChecker(false), 3000);
    setInputWord('');
  };

  const knowAnswer = () => {
    setTrueCount(1);
    setScore((prev) => (prev > 0 ? prev - 10 * falseCount : 0));
    setTimer(3);
    setIsAnswer(true);
    setInputWord('');
  };

  const closeGame = () => dispatch(initial.setMiniGame(false));

  window.onkeydown = (e) => {
    if (e.key === 'Enter') setAnswer();
  };

  return (
    <StyledMiniGame
      gameIsOpen={gameIsOpen}
      onMouseDown={() => mouseDown(setMouseDown)}
      onMouseMove={(e) =>
        mouseMove(e, setMouseDown, setPointX, setPointY, pointX, pointY, isMouseDown, 245, 330)
      }
      onMouseUp={(e) => mouseUp(e, setMouseDown)}
    >
      <section className="header">
        <button onClick={closeGame} />
      </section>
      <section className="game-block">
        <div className="header-text">Anagram-Game</div>
        <section className="word-block flex-box">
          <div className="word">{mixLetters}</div>
          <button className="refresh" onClick={refreshWord}>
            <img src={refreshIco} alt="refresh" />
          </button>
        </section>
        <section className="flex-box">
          <button className="answer-btn" onClick={knowAnswer} />
          <div>Score: {score}</div>
        </section>
        <section className=" input-block flex-box">
          <input
            value={inputWord}
            placeholder="Decipher word..."
            onChange={(e) => setInputWord(e.target.value)}
            type="text"
          />
          <button onClick={setAnswer}>OK</button>
        </section>
        {isAnswer && (
          <>
            <section className="answer">{actualWord}</section>
            <div className="timer">{timer}</div>
          </>
        )}
        {winChecker === 'win' && <StyledWin />}
        {winChecker === 'fail' && <StyledFail />}
      </section>
    </StyledMiniGame>
  );
};

export default MiniGame;
