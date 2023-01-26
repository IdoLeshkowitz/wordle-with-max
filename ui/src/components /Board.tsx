import {NonEvaluatedGuess} from "../../../commonTypes/NonEvaluatedGuess";
import React from "react";
const emptyGuess : NonEvaluatedGuess = {letter: '', index: 0}
const Board = (props : any)=>{
    const {numberOfTiles, guesses} = props
    return (
        <div className="board">
            {Array(numberOfTiles).fill(0).map((_, index) => {
                return <Tile key={index} guess={guesses[index] || emptyGuess} />
            })}
        </div>
    )
}
const Tile = (props : any)=>{
    const {guess} = props
    console.log(guess)
    return (
        <div className="board-tile">
            {guess.letter}
        </div>
    )

}

export default Board