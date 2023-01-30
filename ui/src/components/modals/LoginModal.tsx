import {useAppDispatch} from "../../redux/hooks";
import React, {FormEvent, FormEventHandler} from "react";
import GoogleConnect from "../GoogleConnect";
import {User} from "../../../../commonTypes/User";
import {login, LoginPayload, SignUpPayload} from "../../redux/Features/user/userActions";

const LoginModal = () => {
    //no need for the onsubmit event, it's part of the form component
    const dispatch = useAppDispatch()
    const handleSubmit: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const {email, password}  = Object.fromEntries(data.entries());
        const loginPayload : LoginPayload = {email: email.toString(), password: password.toString()}
        dispatch(login(loginPayload))
    }


    return (
        <form
            onSubmit={handleSubmit}
            onClick={(e)=>{e.stopPropagation()}}
            className='d-flex flex-column align-items-center justify-content-center modal-container'>
            <h1 className="text-light mb-4" >Log-In</h1>
            <input className={'form-control mt-2'} name={'email'} type={'text'}
                   placeholder={'Enter your email'} required/>
            <input className={'form-control mt-2'} name={'password'} type={'text'}
                   placeholder={'Enter your password'} required/>
            <button className={'mt-2 mb-2 border-light btn btn-outline-secondary'} type={'submit'}>Submit</button>
            <GoogleConnect/>
        </form>
    )
}
export default LoginModal