import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {useEffect} from "react";

export const Welcome = () => {
    const navigate = useNavigate();
    const {currentUser} = useAppSelector(state => state.user)
    return <h1>Yo!</h1>;
};
