import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {useEffect} from "react";

export const Welcome = () => {
    const navigate = useNavigate();
    const {currentUser} = useAppSelector(state => state.user)
    return (
        <div className="welcom_container border-1 h-100 m-auto d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-light mb-5 display-1 fw-bold">Wordle</h1>
            <button className="btn btn-outline-secondary w-25">Play</button>
            <button className="btn btn-outline-secondary w-25 mt-1">Log-In</button>
            <button className="btn btn-outline-secondary w-25 mt-1">Sign-Up</button>
        </div>
    );
};
