import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Word from './Word.js';

function App() {

  const [search, setSearch] = useState("");
  const [words, setWords] = useState([]);
  const [wordSize, setWordSize] = useState(1);

  const searchFor = async (searchValue) => {
    console.log(searchValue);
    await fetch(`/find/${searchValue}`)
    .then(response => response.json())
    .then(data => setWords(data.words));  
  }

  return (
    <div>
      <header className="header-style">
        <p className="header-title">Поле Чудес</p>
      </header>
      <section className="search-section">
        <div className="word-size-container">
          <button className="arrow-container" onClick={() => { if(wordSize > 2 )  setWordSize(wordSize-1) } }><div className="left-arrow"></div></button>
          <p className="word-size">{wordSize}</p>
          <button className="arrow-container" onClick={() => { if(wordSize < 20)  setWordSize(wordSize+1) } }><div className="right-arrow"></div></button>
        </div>
        <div className="letter-container">
          
        </div>
        <div>
          <input type="text" placeholder="Поиск слова" value={search} onChange={e => setSearch(e.target.value)}/>
          <button onClick={() => searchFor(search)}>Поиск</button>
        </div>

        <div className="words-container">
          {words.map(word => (
            <Word word={word.word} />
          ))};  
        </div>

      </section>



    </div>
  );
}

export default App;
