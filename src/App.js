import './App.css';
import { useState } from 'react';

const cardImages = [
  { "src": "/images/cheesecake.png"},
  { "src": "/images/doughnut.png"},
  { "src": "/images/fish.png"},
  { "src": "/images/hamburger.png"},
  { "src": "/images/hotdog.png"},
  { "src": "/images/popcorn.png"}
];

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>Start a New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <div className="card" key={card.id}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src='/images/cover.jpg' alt="card back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
