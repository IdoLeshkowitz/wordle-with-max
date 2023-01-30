import React, {ReactElement, useEffect} from "react";
import {AiOutlineEnter} from "react-icons/ai";
import {BsReverseBackspaceReverse} from "react-icons/all";
import {useAppDispatch} from "../redux/hooks";
import {keyboardClicked} from "../redux/Features/keyboard/keyboardActions";
import { EvaluatedGuess } from "../../../commonTypes/EvaluatedGuess";
import { store } from "../redux/store";

const keyColor = (eGuessArr: EvaluatedGuess[], letter: string) => {
    console.log('looking');
    for (let eGuess of eGuessArr){
        if (eGuess.letter === letter && eGuess.correctness) {
            switch (eGuess.correctness) {
                case 'correctPlace':
                    return 'correctPlace';
                case 'incorrectPlace':
                    return 'incorrectPlace';
                case 'notInTargetWord':
                    return 'notInTargetWord';}}}
}

interface VirtualKeyboardButton {
    buttonKey: string,
    buttonSize: string
    rowNum: number;
    displayed?: ReactElement;
}

const virtualKeyboardButtons: VirtualKeyboardButton[] = [
    {buttonKey: 'Q', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'W', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'E', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'R', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'T', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'Y', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'U', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'I', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'O', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'P', buttonSize: 'normal', rowNum: 1},
    {buttonKey: 'A', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'S', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'D', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'F', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'G', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'H', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'J', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'K', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'L', buttonSize: 'normal', rowNum: 2},
    {buttonKey: 'BACKSPACE', buttonSize: 'wide', rowNum: 3, displayed: <BsReverseBackspaceReverse size={12}/>},
    {buttonKey: 'Z', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'X', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'C', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'V', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'B', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'N', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'M', buttonSize: 'normal', rowNum: 3},
    {buttonKey: 'ENTER', buttonSize: 'wide', rowNum: 3, displayed: <AiOutlineEnter size={12}/>},
]
const virtualKeyboardRows = [1, 2, 3].map((rowNum) => {
    return virtualKeyboardButtons.filter((button) => button.rowNum === rowNum)
});

const Key = (props: { letter: string, buttonSize: string, displayed?: ReactElement }) => {
    const dispatch = useAppDispatch()
    const {letter, buttonSize, displayed} = props;
    return (
        <button
            className={`keyboard-btn ${keyColor(store.getState().guesses.evaluatedGuesses, letter)}`}
            key={letter}
            onClick={(()=>dispatch(keyboardClicked(letter)))}
        >
            {displayed || letter}
        </button>
    )
}
const KeyboardRow = ({children}: any) => {
    return (
        <div className="keyboard-row">
            {children}
        </div>
    )
};
const Keyboard = () => {
    const onKeyboardClick = (key: string) => {
        return key
    };
    return (
        <div className="keyboard">
            {virtualKeyboardRows.map((rowButtons, index) =>
                <KeyboardRow key={index}>
                    {rowButtons.map((button) => {
                        return <Key
                            letter={button.buttonKey}
                            buttonSize={button.buttonSize}
                            key={button.buttonKey}
                            displayed={button.displayed}
                        />
                    })}
                </KeyboardRow>
            )}
        </div>
    )
}


export default Keyboard