import {useAppDispatch, useAppSelector} from '../redux/hooks'
import React, {useEffect} from 'react'
import {keyboardClicked} from '../redux/Features/keyboard/keyboardActions'
import Board from "../components /Board";
import {RootState} from "../redux/store";
import Keyboard from "../components /Keyboard";

const getNumberOfTiles = (state: RootState) => {
    return state.game.settings.numberOfRows * state.game.settings.numberOfGuessesInRow
}
export const getAllGuesses = (state: RootState) => {
    const result = [...state.guesses.evaluatedGuesses, ...state.guesses.nonEvaluatedGuesses]
    console.log(result )
    return result
}
const Game = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state)
    useEffect(() => {
        window.addEventListener('keyup', (e) => {
            dispatch(keyboardClicked(e.key.toUpperCase()))
        })
    }, [])
    return (
        <div className="game_page">
            <div className="game_page-main">
                {/*<Board guesses={getAllGuesses(state)} numberOfTiles={getNumberOfTiles(state)}/>*/}
                <Keyboard/>
            </div>
        </div>

    )
}

export default Game
