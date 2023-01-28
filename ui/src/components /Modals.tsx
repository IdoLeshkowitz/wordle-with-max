import {useAppSelector} from "../redux/hooks";
import SideBar from "./SideBar";
import {FormEvent} from "react";

const Modals = () => {
    const {activeModal} = useAppSelector(state => state.overlays)
    if (!activeModal) {
        return <SideBar/>
    }
}

const LoginModal = () => {
    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        //todo : check that email and password are valid
    }
    return (
        <>
        </>
        //todo : sign in form with email and password
    )
}