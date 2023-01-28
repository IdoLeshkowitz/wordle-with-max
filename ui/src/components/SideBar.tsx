import {AiFillInfoCircle, CiLogin, CiLogout} from "react-icons/all";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useGoogleOneTapLogin} from "@react-oauth/google";
import {loginWithGoogle, logout} from "../redux/Features/user/userActions";

const SideBar = () => {
    const {currentUser} = useAppSelector(state => state.user)
    return (<>
            {currentUser === null ? <LoginButton/> : <LogoutButton/>}
            <HelpButton/>
        </>)
}
const LoginButton = () => {
    const dispatch = useAppDispatch()
    useGoogleOneTapLogin({
                             onSuccess: (credentialResponse) => dispatch(loginWithGoogle(credentialResponse))
                         })
    const onLoginClick = () => {

    }
    return (<CiLogin onClick={onLoginClick}/>)
}

const LogoutButton = () => {
    const dispatch = useAppDispatch()
    const onLogoutClick = () => {
        dispatch(logout())
    }
    return (<CiLogout onClick={onLogoutClick}/>)
}

const HelpButton = () => {
    const onHelpClick = () => {

    }
    return (<AiFillInfoCircle onClick={onHelpClick}/>)
}

export default SideBar