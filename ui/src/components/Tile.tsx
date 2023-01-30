import { NonEvaluatedGuess } from '../../../commonTypes/NonEvaluatedGuess';
import { EvaluatedGuess } from '../../../commonTypes/EvaluatedGuess';
import React from 'react';
import { store } from '../redux/store';

const isEmptyGuess = (guess: NonEvaluatedGuess | EvaluatedGuess) => {
    return guess.letter === '';
};

const getCorrectnes = (index: number) => {
    if (store.getState().guesses.evaluatedGuesses[index]) {
        return store.getState().guesses.evaluatedGuesses[index].correctness;
    }
    return null;
};

const Tile = (props: any) => {
    const { guess, isFocused }: { guess: NonEvaluatedGuess | EvaluatedGuess; isFocused: boolean } = props;
    return <div className={`board-tile ${isEmptyGuess(guess) && 'empty'} ${isFocused && 'focused'} ${getCorrectnes(props.index)}`}>{guess.letter}</div>;
};
export default Tile;
