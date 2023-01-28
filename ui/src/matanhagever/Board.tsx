import {NonEvaluatedGuess} from "../../../commonTypes/NonEvaluatedGuess";
import React from "react";
import {EvaluatedGuess} from "../../../commonTypes/EvaluatedGuess";
import Tile from "./Tile";

const emptyGuess: NonEvaluatedGuess = {letter: '', index: 0}
const Board = (props: any) => {
    const {numberOfTiles, guesses} = props
    return (<div className="board">
        {Array(numberOfTiles).fill(0).map((_, index) => {
            return <Tile
                key={index}
                guess={guesses[index] || emptyGuess}
                isFocused={index === guesses.length }
            />
        })}
    </div>)
}


export default Board