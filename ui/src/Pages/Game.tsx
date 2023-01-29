import {useAppDispatch, useAppSelector} from '../redux/hooks'
import React, {useEffect} from 'react'
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import {useGoogleOneTapLogin} from "@react-oauth/google";
import {startGame} from "../redux/Features/game/gameActions";
import {loginWithGoogle} from "../redux/Features/user/userActions";

const Game = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(startGame())
    }, [])
    const state = useAppSelector((state) => state)
    const {nonEvaluatedGuesses, evaluatedGuesses} = state.guesses
    const {numberOfRows, numberOfColumns} = state.game.settings
    return (
        <div className="game_page">
            {/*<Toasts/>*/}
            <div className="game_page-main">
                <Board
                    guesses={[...evaluatedGuesses, ...nonEvaluatedGuesses]}
                    numberOfTiles={numberOfRows * numberOfColumns}
                />
                <Keyboard/>
            </div>
        </div>

    )
}

export default Game
