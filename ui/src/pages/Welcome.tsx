import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {logInClicked, signUpClicked} from "../redux/Features/overlays/overlaysActions";

export const Welcome = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div
            className="welcom_container border-1 h-100 m-auto d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-light mb-5 display-1 fw-bold">Wordle</h1>
            <button className="btn btn-outline-secondary w-25" onClick ={()=>navigate('/game')}>Play</button>
            <button className="btn btn-outline-secondary w-25 mt-1" onClick={()=>dispatch(logInClicked())}>Log-In</button>
            <button className="btn btn-outline-secondary w-25 mt-1" onClick={()=>dispatch(signUpClicked())}>Sign-Up</button>
        </div>
    );
};
