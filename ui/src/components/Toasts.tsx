import {useAppSelector} from "../redux/hooks";


const Toasts = () => {
    const toasts = useAppSelector(state => state.overlays.toasts);
    return (
        <div className="toasts">
            {toasts.map((toast, index) => <div key={index} className="toast"><span>{toast}</span></div>)}
        </div>
    )
}

export default Toasts