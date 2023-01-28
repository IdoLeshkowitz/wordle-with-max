import {AiFillInfoCircle, CiLogin, CiLogout} from "react-icons/all";
import {useAppSelector} from "../redux/hooks";

const SideBar = () => {
    const {currentUser} = useAppSelector(state => state.user)
    return (
        <>
            {currentUser === null ? <LoginButton/> : <LogoutButton/>}
            <HelpButton/>
        </>
    )
}
const LoginButton = () => {
    const onLoginClick = () => {

    }
    return (
        <CiLogin onClick={onLoginClick}/>
    )
}

const LogoutButton = () => {
    const onLogoutClick = () => {

    }
    return (
        <CiLogout onClick={onLogoutClick}/>
    )
}

const HelpButton = () => {
    const onHelpClick = () => {

    }
    return (
        <AiFillInfoCircle onClick={onHelpClick}/>
    )
}

export default SideBar