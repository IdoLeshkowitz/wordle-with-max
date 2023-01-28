import {NonEvaluatedGuess} from "../../../commonTypes/NonEvaluatedGuess";
import {EvaluatedGuess} from "../../../commonTypes/EvaluatedGuess";
import React from "react";

const isEmptyGuess = (guess: NonEvaluatedGuess | EvaluatedGuess)=> {
    return guess.letter === ''
}

const Tile = (props: any) => {
    const {guess,isFocused}: { guess: NonEvaluatedGuess | EvaluatedGuess ,isFocused:boolean} = props
    return (<div className={`board-tile ${isEmptyGuess(guess)&& 'empty'} ${isFocused && 'focused'}`}>
            {guess.letter}
        </div>)

}
export default Tile
