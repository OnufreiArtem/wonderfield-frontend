import React from 'react';

 
function Word({word}){
    return(
        <div className="word-container-style">
            <p className="word-text-style">{word}</p>
        </div>
    );
}

export default Word;