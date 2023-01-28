import {useAppDispatch} from "../redux/hooks";
import React, {FormEvent, FormEventHandler} from "react";

const LoginModal = () => {
    //no need for the onsubmit event, it's part of the form component
    const dispatch = useAppDispatch()
    const handleSubmit: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const {email, password} = Object.fromEntries(data.entries());
        console.log(email, password)
        //the dispatch, dispatches the form results
    }

    return (
        <form onSubmit={handleSubmit}
              className='d-flex flex-column align-items-center justify-content-center'>
            <input className={'form-control mt-2'} name={'email'} type={'text'}
                   placeholder={'Enter your email'}/>
            <input className={'form-control mt-2'} name={'password'} type={'text'}
                   placeholder={'Enter your password'}/>
            <button className={'mt-2 btn btn-outline-secondary'} type={'submit'}>Submit</button>
        </form>
    )
}
export default LoginModal