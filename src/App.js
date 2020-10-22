import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Word from './Word.js';
import Loader from './Loader';

function App() {

  const minWordSize = 3;
  const maxWordSize = 14;
  const [words, setWords] = useState([]);
  const [wordSize, setWordSize] = useState(minWordSize);
  const [letters, setLetters] = useState([formLetters(wordSize)]);
  const [loading, setLoading] = useState(false);

  const searchFor = async (searchValue) => {
    setLoading(true);
    console.log(searchValue);
    await fetch(`https://guess-persones-server.oa.r.appspot.com/find/${searchValue}`)
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      setWords(data.words);
    }); 

  }

  function getTextSearch(){
    let searchText = "";
    for(let i = 0; i < wordSize; i++){
      let inputValue = document.getElementById(`letter${i}`).value;
      if(inputValue === " " || inputValue === "?" || inputValue === ""){
        searchText += "_";
      } else{
        searchText += inputValue;
      }
    }  
    console.log(searchText);
    return searchText;
  }

  function formLetters(count){
    let elements = []
    for(let i = 0; i < count; i++){
      elements.push(
        <input className="letter-style" id={`letter${i}`} type="text" maxLength="1" placeholder="?"/>
      );
    }

    return(
      elements
    );
  }

  function addLetter(){
    if (wordSize < 14) {
      setWordSize(wordSize+1);
      setLetters(formLetters(wordSize+1));
      console.log(wordSize+1);
    }
  }

  function removeLetter(){
    if (wordSize > 3) {
      setWordSize(wordSize-1);
      setLetters(formLetters(wordSize-1));
      console.log(wordSize-1);
    }
  }


  return (
    <div>
      <header className="header-style" id="header">
        <p className="header-title">Поле Чудес</p>
      </header>
      <section className="search-section">
        <div className="word-size-container">
          <button className="arrow-container" onClick={() => { removeLetter() } }><div className="left-arrow"></div></button>
          <p className="word-size">{wordSize}</p>
          <button className="arrow-container" onClick={() => { addLetter() } }><div className="right-arrow"></div></button>
        </div>

        <div className="letters-container">
          {letters}
        </div>

        <div className="search-button-container">
          <a href="#results">
          <button className="search-button" onClick={() => searchFor(getTextSearch())}>Поиск</button>
          </a>
        </div>

      </section>

      <section className="result-section" id="results">
        { loading && <Loader /> }
        <div className="words-container">
          {words.map((word, index) => (
            <Word word={word.word} id={`word${index}`} />
          ))};  
        </div>

    
      </section>
    </div>
  );
}

export default App;
