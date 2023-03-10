import {useAppDispatch, useAppSelector} from "../redux/hooks";
import React, {MouseEventHandler} from "react";
import {ModalType} from "../redux/Features/overlays/overlaysSlice";
import LoginModal from "./modals/LoginModal";
import {closeModal} from "../redux/Features/overlays/overlaysActions";
import SignupModal from "./modals/SignupModal";
import EndModal from "./modals/EndModal";
import HelpModal from "./modals/HelpModal";

const Modal = () => {
    const dispatch = useAppDispatch()
    const {activeModal} = useAppSelector(state => state.overlays)
    if (!activeModal) {
        return null
    }
    const onBlur: MouseEventHandler = (e) => {
        dispatch(closeModal())
    }
    return (
        <div className="modal_window" onClick={onBlur}>
            {activeModal === ModalType.login && <LoginModal/>}
            {activeModal === ModalType.help && <HelpModal></HelpModal>}
            {activeModal === ModalType.signup && <SignupModal></SignupModal>}
            {activeModal === ModalType.gameEnded && <EndModal/>}
        </div>
    )
}

export default Modal