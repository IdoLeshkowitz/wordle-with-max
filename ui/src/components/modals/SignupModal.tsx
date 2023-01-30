import {useAppDispatch} from "../../redux/hooks";
import {FormEvent, FormEventHandler} from "react";
import {signUp, SignUpPayload} from "../../redux/Features/user/userActions";

const SignupModal = () => {
    const dispatch = useAppDispatch()
    const handleSubmit: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const {email, password,firstName, lastName}  = Object.fromEntries(data.entries());
        const signUpPayload : SignUpPayload = {email: email.toString(), password: password.toString(), firstName: firstName.toString(), lastName: lastName.toString()}
        dispatch(signUp(signUpPayload))
    }
    return (
        <form
            onSubmit={handleSubmit}
            onClick={(e)=>{e.stopPropagation()}}
            className='d-flex flex-column align-items-center justify-content-center modal-container'>
        </form>
    )
}