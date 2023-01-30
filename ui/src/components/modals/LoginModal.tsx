import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import React from "react";
import GoogleConnect from "../GoogleConnect";
import {signUpClicked} from "../../redux/Features/overlays/overlaysActions";
import {useForm} from "react-hook-form";
import {LoginPayload} from "../../../../commonTypes/LoginRequestPayload";
import {login} from "../../redux/Features/user/userActions";
import {ErrorType} from "../../../../commonTypes/Errors";
import {EMAIL_REGEX} from "./SignupModal";
import Spinner from "react-bootstrap/Spinner";
import {GameStatus} from "../../redux/Features/game/gameSlice";
type FormData = {
    email: string;
    password: string;
}
const LoginModal = () => {
    //no need for the onsubmit event, it's part of the form component
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state)
    const {register, formState: {errors}, handleSubmit} = useForm<FormData>()
    const onSubmit = handleSubmit((data: FormData) => {
        const {email, password}: LoginPayload = data
        dispatch(login({email, password}))
    })
    if (state.game.status === GameStatus.pending) {
        return( <div className='modal-container d-flex align-items-center justify-content-center'>
            <Spinner />
        </div>)
    }
    const signUpClick = () => {
        dispatch(signUpClicked())
    }
    return (
        <form
            onSubmit={onSubmit}
            onClick={(e) => {
                e.stopPropagation()
            }}
            onKeyUp={(e) => {
                e.stopPropagation()
            }}
            className='d-flex flex-column  align-content-between justify-content-center modal-container align-items-stretch'
        >
            <h1 className="text-light mb-4 align-self-center">Login</h1>
            {state.errors.errors.includes(ErrorType.LOGIN_ERROR) && <label>👮Invalid email or password</label>}
            <div className='form-group'>
                {errors['email'] && <label>🙅‍Please enter a valid email</label>}
                <input className={'form-control'} type={'text'}
                       placeholder={'email'}{...register('email', {required: true, pattern: EMAIL_REGEX})}/>
            </div>
            <div className='form-group'>
                {errors['password'] && <label>🙅‍Please enter a valid password</label>}
                <input className={'form-control'} type={'password'}
                       placeholder={'password'}{...register('password', {required: true})}/>
            </div>
            <section className='d-flex justify-content-evenly '>
                <GoogleConnect/>
                <button className='mt-2 btn btn-outline-secondary'>submit</button>
                <button
                    className={'mt-2 btn btn-outline-secondary'}
                    type='button'
                    onClick={signUpClick}>
                    sign up
                </button>
            </section>
        </form>
    )
}
export default LoginModal