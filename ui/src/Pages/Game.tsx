import {useAppDispatch, useAppSelector} from '../redux/hooks'
import React, {useEffect} from 'react'
import {keyboardClicked} from '../redux/Features/keyboard/keyboardActions'
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import {useGoogleOneTapLogin} from "@react-oauth/google";

const Game = () => {
    useEffect(() => {
        window.addEventListener('keyup', (e) => {
            dispatch(keyboardClicked(e.key.toUpperCase()))
        })
    }, [])
    useGoogleOneTapLogin({
                             onSuccess: (credentialResponse) => {
                                 console.log(credentialResponse)
                             }
                         })
    const dispatch = useAppDispatch()
    const state = useAppSelector((state) => state)
    const {nonEvaluatedGuesses, evaluatedGuesses} = state.guesses
    const {numberOfRows,numberOfColumns} = state.game.settings
    return (
        <div className="game_page">
            <div className="game_page-main">
                <Board guesses={[...evaluatedGuesses, ...nonEvaluatedGuesses]} numberOfTiles={numberOfRows * numberOfColumns}/>
                <Keyboard/>
            </div>
        </div>

    )
}

export default Game
