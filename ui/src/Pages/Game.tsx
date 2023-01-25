import { useAppDispatch, useAppSelector } from '../redux/hooks'

const Game = () => {
    const dispatch = useAppDispatch();
    const spinner = useAppSelector((state) => state.overlays.spinner);
    return <h1>{spinner}</h1>;
};

export default Game;
