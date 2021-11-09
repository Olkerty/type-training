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

function App() {
  const [records, setRecords] = useState([]);
  const [arrayOfTexts, setArrayOfTexts] = useState('')
  const [text, setText] = useState('');

  const [fetchText, postError] = useFetching(async () => {
    const response = await getText();
    setArrayOfTexts(response.data);
  })
  useEffect(() => {
    fetchText();
    if (localStorage.getItem('records')) {
      setRecords(JSON.parse(localStorage.records));
      //localStorage.getItem('records')
      console.log(JSON.parse(localStorage.records));
    }
  }, []);
  return (
    <div className='App'>
      <TypeTrainer arrayOfTexts={['asda', 'asdws', 'yqeb']} setRecords={setRecords} records={records} />
      <div className='tableofrecords'>
        <h2>
          Table of Records
        </h2>
        {
          records.sort((a, b) => b.accuracy - a.accuracy).map((record, index) => {
            return (
              <div className='recorditem'>
                <h3>
                  Record number {index + 1}:
                </h3>
                <p>
                  Speed: {record.speed} chars per minute
                </p>
                <p>
                  Accuracy: {record.accuracy}%
                </p>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;