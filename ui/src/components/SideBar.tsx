import {AiFillInfoCircle, CiLogin, CiLogout} from "react-icons/all";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {logout} from "../redux/Features/user/userActions";
import {ModalType} from "../redux/Features/overlays/overlaysSlice";
import {openModal} from "../redux/Features/overlays/overlaysActions";


const SideBar = () => {
    const {currentUser} = useAppSelector(state => state.user)
    const {activeModal} = useAppSelector(state => state.overlays)
    if (activeModal) {
        return null
    }
    return (<div className="sidebar">
        <UserName/>
        {currentUser === null ? <LoginButton/> : <LogoutButton/>}
        <HelpButton/>
    </div>)
}
const UserName = () => {
    const currentUser = useAppSelector(state => state.user.currentUser)
    if (currentUser === null) {
        return null
    }
    return (
        <label>hello <br/>{currentUser.firstName}</label>
    )
}
const LoginButton = () => {
    const dispatch = useAppDispatch()
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