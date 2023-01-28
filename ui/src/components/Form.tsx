import React, {FormEvent, FormEventHandler, useContext} from "react";
import {useAppDispatch, useAppSelector} from '../redux/hooks'
export function Form() {
    const dispatch = useAppDispatch()
    const handleSubmit: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const data = new FormData(form);
        const dataObj = Object.fromEntries(data);
        //the next dispatch, dispatch the form results
        dispatch(formSubmitted(dataObj))
    }

    return (
        <form onSubmit={handleSubmit} className={'d-flex flex-column align-items-center justify-content-center'}>
            <input className={'form-control mt-2'} name={'email'} type={'text'}
                   placeholder={'Enter your email'}/>
            <input className={'form-control mt-2'} name={'password'} type={'text'} placeholder={'Enter your password'}/>
            <button className={'mt-2 btn btn-outline-secondary'} type={'submit'}>Submit</button>
        </form>
    )
}