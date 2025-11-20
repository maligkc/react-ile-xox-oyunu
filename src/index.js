import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from  'react';
import './index.css';

function XoxGameComponent(){

  const [games, setGames] = useState([]);
  const [mark, setMark] = useState("X");
  const [message, setMessage] = useState("");
  const [isGameFinish, setIsGameFinish] = useState(false);
  const [gameMove, setGameMove] = useState([]);

  useEffect(() => {
    newGame();
  }, []) // newGame bir defaya mahsus çalışacak

  const newGame = () => {
    setGames([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]);
    setIsGameFinish(false);
    setMark("X");
    setMessage("Hamle sırası: " + mark)
    setGameMove([]);
  }

  const markGame = (index) => {
    if(!isGameFinish){
      const newGames = [...games];
      if (newGames[index] == "") {
        newGames[index] = mark;
        setGames(newGames);
        setGameMove((val) => [...val, newGames]);
        console.log(gameMove)


        let r = isGameOver(newGames);
        if(r){
          setMessage("Oyunu " + mark + " kazandı!")
          setIsGameFinish(true);
          return;
        }

        let e = isMoveFinish(newGames);

        if(e){
          setMessage("Oyun berabere");
          setIsGameFinish(true);
          return;
        }

        

        if (mark == "X") {
          setMark("O");
        } else {
          setMark("X");
        }
        setMessage("Hamle sırası: " + (mark == "X" ? "O" : "X"));
      }
    }
  }
  const isGameOver = (newGames) => {
    if(newGames[0] != "" && 
      newGames[0] === newGames[1] && 
      newGames[1] === newGames[2]){
        return true;
    }
    else if(newGames[3] != "" && 
      newGames[3] === newGames[4] && 
      newGames[4] === newGames[5]){
        return true;
    }
    else if(newGames[6] != "" && 
      newGames[6] === newGames[7] && 
      newGames[7] === newGames[8]){
        return true;
    }
    else if(newGames[0] != "" && 
      newGames[0] === newGames[3] && 
      newGames[3] === newGames[6]){
        return true;
    }
    else if(newGames[1] != "" && 
      newGames[1] === newGames[4] && 
      newGames[4] === newGames[7]){
        return true;
    }
    else if(newGames[2] != "" && 
      newGames[2] === newGames[5] && 
      newGames[5] === newGames[8]){
        return true;
    }
    else if(newGames[0] != "" && 
      newGames[0] === newGames[4] && 
      newGames[4] === newGames[8]){
        return true;
    }
    else if(newGames[2] != "" && 
      newGames[2] === newGames[4] && 
      newGames[4] === newGames[6]){
        return true;
    }
    else{
      return false;
    }
  }





  function isMoveFinish(newGames){
    for (let index = 0; index < newGames.length; index++) {
      const element = newGames[index];
      if(element == ""){
        return false;
      }
    }
    return true;
  }

  const setThatGameMove = (game) => {
    setGames(game);
  }





  return(
    <>
    <div className='container text-center'>
      <h1>XOX Oyunu</h1>
      <h2 className='alert alert-warning'>
        {message} 
      </h2>
      <button className='btn btn-outline-primary w-100'
      onClick={newGame}>
        Yeni Oyun
      </button>
      <div className='row mt-2'>
        {games.map((game, index) => (
          <div key={index} 
          className='col-md-4 box'
          onClick={() => markGame(index)}>
            {game}
          </div>
        ))}
      </div>
      <hr/>
        {gameMove.map((game, index) =>(
          <button onClick={() => setThatGameMove(game)} className='mx-1 btn  btn-primary' key={index}> {index + 1}. Hamle</button>
        ))}
    </div>
    
    </>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <XoxGameComponent/>
);
