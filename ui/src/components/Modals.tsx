import {useAppDispatch, useAppSelector} from "../redux/hooks";
import SideBar from "./SideBar";
import React, {FormEvent, FormEventHandler} from "react";
import {ModalType} from "../redux/Features/overlays/overlaysSlice";
import LoginModal from "./LoginModal";

const Modals = () => {
    const {activeModal} = useAppSelector(state => state.overlays)
    if (!activeModal) {
        return null
    }
    return (
        <div className="modal_window">
            {activeModal=== ModalType.login && <LoginModal/>}
            {activeModal === ModalType.help && <></>}
        </div>
    )
}

export default Modals