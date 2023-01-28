import {useAppSelector} from "../redux/hooks";
import SideBar from "./SideBar";
import {FormEvent} from "react";
import {Form} from "./Form";

const Modals = () => {
    const {activeModal} = useAppSelector(state => state.overlays)
    return (
        <>
        <SideBar/>
        <LoginModal/>
        </>
    )
}

const LoginModal = () => {
    //no need for the onsubmit event, it's part of the form component
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        //todo : check that email and password are valid
    }
    return (
        <div className="modal-container">
            <Form/>
        </div>
    )
}
export default Modals