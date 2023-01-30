import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {GameStatus} from "../../redux/Features/game/gameSlice";
import {startGame} from "../../redux/Features/game/gameActions";

const winningMessage = 'You won! 🥳👏'
const losingMessage = 'You lost! 😿👎'
const EndModal = () => {
    const dispatch = useAppDispatch()
    const {status :gameStatus } = useAppSelector((state) => state.game)
    return (
        <div className='modal-container'>
            <div className='end-message'>
            {gameStatus === GameStatus.endedWithWin ? winningMessage : losingMessage}
            <button
                className='mt-2 btn btn-outline-light'
                onClick={()=>dispatch(startGame())}
            >play another game</button>
            </div>
        </div>
    )
}
export default EndModal