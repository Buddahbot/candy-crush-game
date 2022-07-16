import { useState, useEffect } from "react";
import BlueCandy from './images/blue-candy.png'
import BlankCandy from './images/blank.png'
import GreenCandy from './images/green-candy.png'
import OrangeCandy from './images/orange-candy.png'
import PurpleCandy from './images/purple-candy.png'
import RedCandy from './images/red-candy.png'
import YellowCandy from './images/yellow-candy.png'

const width = 8; // definiert die groesse des spielfelds

const candyColors = [BlueCandy, GreenCandy, OrangeCandy, PurpleCandy, RedCandy, YellowCandy]; // definiert die farben

const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]); // speichert dies im useState
  const [squareBeingDragged, setSquareBeingDragged]= useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced]= useState(null)

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      //if (currentColorArrangement[i] === currentColorArrangement[i + width] && currentColorArrangement[i] === currentColorArrangement[i + width] * 2)
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        //every returns boolean
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = BlankCandy)
        );
      }
    }
  };

  const checkForColumnFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = BlankCandy)
        );
      }
    }
  };

  const checkForRowThree = () => {
    for (let i = 0; i < 63; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];

      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfThree.forEach((square) => (currentColorArrangement[square] = BlankCandy))
      }
    }
  };

  const checkForRowFour = () => {
    for (let i = 0; i < 63; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfFour.forEach((square) => (currentColorArrangement[square] = BlankCandy));
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 63 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === BlankCandy) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangement[i] = candyColors[randomNumber]
      }

      if(currentColorArrangement[i + width] === BlankCandy) {
        currentColorArrangement[i+ width] = currentColorArrangement[i]
        currentColorArrangement[i] = BlankCandy
      }
    }
  }

  const dragStart = (e) => {
    console.log(e.target)
    console.log('drag start')
    setSquareBeingDragged(e.target)


    
  }

  const dragDrop = (e) => {
    console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {
    console.log('drag end')
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id')) // speicher index von gedraggedem square
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id')) // speicher index von square wo das gedraggde square hingesetzt werden oll 

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src') // spiehert die farbe des gedraggden auf das platziertee feld
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
  

    const validMoves = [squareBeingDraggedId -1,
                  squareBeingDraggedId +1,
                  squareBeingDraggedId -width,
                  squareBeingDraggedId +width,
    ]
    const validMove = validMoves.includes(squareBeingReplacedId)
    
    const isColumnOfFour = checkForColumnFour()
    const isColumnOfThree = checkForColumnOfThree()
    const isRowOfFour = checkForRowFour()
    const isRowOfThree = checkForRowThree()

    if(squareBeingReplacedId && validMove && (isRowOfThree || isRowOfFour || isColumnOfThree || isColumnOfFour)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangement])
      
    }
  }

  const createBoard = () => {
    const randomColorArrangement = []; // looped 64 mal
    for (let i = 0; i < width * width; i++) {
      // fuer jedes feld im Spielfeld wir eine farbe benoetigt.

      const randomColor = // kreiert fuer jeden index eine zufallsfarbe
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor); // steckt die zufallsfarbe in randomcolorarrangement
    }
    setCurrentColorArrangement(randomColorArrangement); //randomcolorarrgement wird currentcolorarrangment eingeimpft
  };
  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnFour();
      checkForColumnOfThree();
      checkForRowFour();
      checkForRowThree();
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 1000);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfThree,
    checkForColumnFour,
    checkForRowThree,
    checkForRowFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  console.log(currentColorArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColors, index) => (
          <img
            key={index}
            src={candyColors}
            alt={candyColors}
            data-id={index}
            draggable={true}
            onDragStart ={dragStart}
            onDragOver = {(e) => e.preventDefault()}
            onDragEnter = {(e) => e.preventDefault()}
            onDragLeave = {(e) => e.preventDefault()}
            onDrop ={dragDrop}
            onDragEnd ={dragEnd}

          />
        ))}
      </div>
    </div>
  );
};

export default App;
