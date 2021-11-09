import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { useFetching } from './hooks/useFetching';
import { TypeTrainer } from './components/TypeTrainer/TypeTrainer';

async function getText() {
  const response = await axios.get('https://baconipsum.com/api/?type=meat-and-filler');
  return response;
}
export function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


let wronc = 0;
let righc = 0;

function App() {
  /*
  const [wrongCounter, setWrongCounter] = useState(0);
  const [rightCounter, setRightCounter] = useState(0);
  const [timer, setTimer] = useState(0);
  let time = 0;
  let timerId;
  let currentChar;
  let arrayOfTexts;
  const textContainer = document.querySelector('.text-container');
  const [text, setText] = useState('');
  */
  const [arrayOfTexts, setArrayOfTexts] = useState('')
  const [text, setText] = useState('');

  const [fetchText, postError] = useFetching(async () => {
    const response = await getText();
    setArrayOfTexts(response.data);
    //text = getRandomItem(arrayOfTexts).replace('. ', '.');
    //console.log(text);
    setText(getRandomItem(arrayOfTexts).replace('. ', '.'));
  })
  useEffect(() => {
    fetchText();
    //setText("in.  ut eu esse, duis landjaeger magna".replace('. ', '.'));

  }, []);
  /*
    function compareChars(event) {
      //console.log(text[righc]);
      // console.log(event.key);
      //console.log(event.key == text[righc]);
      //console.log(event.key);
      if (true) {
        //event.key !== 'Shift' && event.key !== 'CapsLock'
        console.log(`event.key=${event.key}`);
        console.log(`text[righc]=${text[righc]}`);
        if (event.key == text[righc]) {
          setRightCounter(righc + 1);
          console.log(1234);
          currentChar.classList.remove('rightChar');
          currentChar.classList.remove('wrongChar');
          currentChar = currentChar.nextElementSibling;
          currentChar.classList.add('rightChar');
          righc++;
        } else {
          setWrongCounter(wronc + 1);
          currentChar.classList.add('wrongChar');
          wronc++;
        }
      }
      //console.log(righc);
      // console.log(wrongCounter);
      // console.log(event);
    }
  
    function startGame(event) {
      currentChar = textContainer.firstChild;
      currentChar.classList.add('rightChar');
      console.log(event.target);
      event.target.disabled = true;
      timerId = setInterval(() => { setTimer(time + 1); time++; }, 1000);
      window.addEventListener('keydown', compareChars)
    }
  
    function finishGame() {
      setRightCounter(0);
      setWrongCounter(0);
      clearInterval(timerId);
      console.log(arrayOfTexts);
      //setText(getRandomItem(arrayOfTexts).replace('. ', '.'));
      window.removeEventListener('keydown', compareChars)
    }
  */
  /*
  text, rightCounter, wrongCounter,timer, startgame, finishGame
  
  */

  return (
    <div className='App'>
      <TypeTrainer arrayOfTexts={arrayOfTexts} />

    </div>
  );
}

export default App;


/*
 <div className='text-container'>
        {text.split('').map(function (char) {
          // console.log(char == ' ');
          return (
            <span className='char'>
              {char}
            </span>
          );
        }
        )}
      </div>

      <div>
        Accuracy: {rightCounter / (rightCounter + wrongCounter) ?
          (100 * rightCounter / (rightCounter + wrongCounter)).toFixed(2) :
          100}%
      </div>
      <div>
        Speed {(60 * (rightCounter) / timer) ? (60 * (rightCounter) / timer).toFixed(2) : 0} signs per minute
      </div>
      <button onClick={startGame}>
        Start button
      </button>
      <button onClick={finishGame}>
        Reset button
      </button>

*/