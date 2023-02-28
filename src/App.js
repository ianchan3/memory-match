import './App.css';
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/images/cheesecake.png", matched: false},
  { "src": "/images/doughnut.png", matched: false},
  { "src": "/images/fish.png", matched: false},
  { "src": "/images/hamburger.png", matched: false},
  { "src": "/images/hotdog.png", matched: false},
  { "src": "/images/popcorn.png", matched: false}
];

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}


useEffect(() => {
  if (choiceOne && choiceTwo ) {

    if( choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn();
    } else {
      resetTurn();
    }
  }
},[choiceOne, choiceTwo])


const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>Start a New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
        <SingleCard card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched}/>
        ))}
      </div>
    </div>
  );
}

export default App;
