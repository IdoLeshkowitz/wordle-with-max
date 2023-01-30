import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {useEffect} from "react";
import HelpModal from "../components/modals/HelpModal";

export const Welcome = () => {
    const navigate = useNavigate();
    const {currentUser} = useAppSelector(state => state.user)
    return (
        <>
            <HelpModal/>
        </>
    );
};
