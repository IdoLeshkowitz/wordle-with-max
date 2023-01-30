import {useAppDispatch, useAppSelector} from "../redux/hooks";
import React, {MouseEventHandler} from "react";
import {ModalType} from "../redux/Features/overlays/overlaysSlice";
import LoginModal from "./LoginModal";
import {closeModal} from "../redux/Features/overlays/overlaysActions";

const Modals = () => {
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
            {activeModal === ModalType.help && <></>}
        </div>
    )
}

export default Modals