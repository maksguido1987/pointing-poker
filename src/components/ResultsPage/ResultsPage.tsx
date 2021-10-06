import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import GameCard from '../GameCard/GameCard';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';
import { StyledResultsPage } from './StyledResultsPage';
import coffeeIco from '../../assets/icons/coffee-ico.svg';
import questionIco from '../../assets/icons/question-ico.svg';
import { RootState } from '../../redux';
import { ExportCSV } from './helper';

const setContent = (content: string | number) => {
  if (typeof content === 'number') return content;
  if (content === 'Unknown') return questionIco;
  if (content === 'Coffee') return coffeeIco;
  return '';
};

const ResultsPage = () => {
  const results = useSelector((store: RootState) => store.results.store);
  const fileName = useSelector((store: RootState) => store.initial.gameTitle);
  const history = useHistory();
  const objForExcel = results.reduce((acc, el) => {
    acc.push({
      Task: el.title,
      Results: el.cardsResult
        .map(
          (card) =>
            `${typeof card.content === 'string' ? card.content : `${card.content}SP`}: ${
              card.stats
            }%`,
        )
        .join(' | '),
    });
    return acc;
  }, []);

  const exitBtn = () => {
    history.push('/');
    window.location.reload();
  };

  return (
    <StyledResultsPage>
      <Link to="/" onClick={exitBtn}>
        <Button text="Exit" color={whiteColor} colorBG={blueColor} />
      </Link>
      {results.map(
        (el, i) =>
          el && (
            <div key={i}>
              <div className="title">{el.title}:</div>
              <section className="cards-section">
                {el.cardsResult.map((card, ind) => (
                  <div className="card" key={ind}>
                    <div className="stats">{card.stats}%</div>
                    <GameCard
                      content={setContent(card.content)}
                      ID={card.id}
                      type={typeof card.id === 'number' ? 'SP' : card.id}
                      isStats={false}
                    />
                  </div>
                ))}
              </section>
            </div>
          ),
      )}
      <ExportCSV csvData={objForExcel} fileName={fileName} />
    </StyledResultsPage>
  );
};

export default ResultsPage;
