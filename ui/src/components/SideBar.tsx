import {AiFillInfoCircle, CiLogin, CiLogout} from "react-icons/all";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useGoogleOneTapLogin} from "@react-oauth/google";
import {loginWithGoogle, logout} from "../redux/Features/user/userActions";
import {ModalType} from "../redux/Features/overlays/overlaysSlice";
import {openModal} from "../redux/Features/overlays/overlaysActions";


const SideBar = () => {
    const {currentUser} = useAppSelector(state => state.user)
    const {activeModal} = useAppSelector(state => state.overlays)
    if (activeModal) {
        return null
    }
    return (<div className="sidebar">
        {/*{currentUser === null ? <LoginButton/> : <LogoutButton/>}*/}
        <LoginButton/>
        <HelpButton/>
    </div>)
}
const LoginButton = () => {
    const dispatch = useAppDispatch()
    useGoogleOneTapLogin({
                             onSuccess: (credentialResponse) => dispatch(loginWithGoogle(credentialResponse))
                         })
    const onLoginClick = () => {
        dispatch(openModal(ModalType.login))
    }
    return (<>
            <button onClick={onLoginClick} className="sidebar-item">
                <CiLogin className="icon"/>
            </button>
            <span>login</span>
        </>
    )
}

const LogoutButton = () => {
    const dispatch = useAppDispatch()
    const onLogoutClick = () => {
        dispatch(logout())
    }
    return (
        <>
            <button onClick={onLogoutClick} className="sidebar-item">
                <CiLogout className="icon"/>
            </button>
            <span>log out</span>
        </>
    )
}

const HelpButton = () => {
    const onHelpClick = () => {

    }
    return (
        <>
            <button onClick={onHelpClick} className="sidebar-item">
                <AiFillInfoCircle className="icon"/>
            </button>
            <span>help</span>
        </>
    )
}

export default SideBar