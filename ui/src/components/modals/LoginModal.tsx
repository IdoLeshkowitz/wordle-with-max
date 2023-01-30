import {useAppDispatch} from "../../redux/hooks";
import React, {FormEvent, FormEventHandler} from "react";
import GoogleConnect from "../GoogleConnect";
import {login, LoginPayload} from "../../redux/Features/user/userActions";
import {openModal} from "../../redux/Features/overlays/overlaysActions";
import {ModalType} from "../../redux/Features/overlays/overlaysSlice";

const LoginModal = () => {
    //no need for the onsubmit event, it's part of the form component
    const dispatch = useAppDispatch()
    const handleSubmit: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const {email, password} = Object.fromEntries(data.entries());
        const loginPayload: LoginPayload = {email: email.toString(), password: password.toString()}
        dispatch(login(loginPayload))
    }
    const signUpClick = () => {
        dispatch(openModal(ModalType.signup))
    }


    return (
        <form
            onSubmit={handleSubmit}
<<<<<<< HEAD
            onClick={(e)=>{e.stopPropagation()}}
            className='d-flex flex-column align-items-center justify-content-center modal-container'>
            <h1 className="text-light mb-4" >Log-In</h1>
=======
            onClick={(e) => {
                e.stopPropagation()
            }}
            className='d-flex flex-column align-items-center align-content-between justify-content-center modal-container '>
>>>>>>> 7630ddac204a7ee738f8ccfedc2c6bf13e759638
            <input className={'form-control mt-2'} name={'email'} type={'text'}
                   placeholder={'Enter your email'} required/>
            <input className={'form-control mt-2'} name={'password'} type={'text'}
<<<<<<< HEAD
                   placeholder={'Enter your password'} required/>
            <button className={'mt-2 mb-2 border-light btn btn-outline-secondary'} type={'submit'}>Submit</button>
            <GoogleConnect/>
=======
                   placeholder={'Enter your password'}/>
            <button className={'mt-2 btn btn-outline-secondary'} type={'submit'}>Submit</button>
            <section className='d-flex justify-content-evenly '>
                <GoogleConnect/>
                <button
                    className={'mt-2 btn btn-outline-secondary'}
                    type='button'
                    onClick={signUpClick}>
                    sign up
                </button>
            </section>
>>>>>>> 7630ddac204a7ee738f8ccfedc2c6bf13e759638
        </form>
    )
}
export default LoginModal