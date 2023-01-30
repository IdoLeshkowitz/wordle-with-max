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
            <h1 className="text-light mb-4" >Sign-Up</h1>
            <input className={'form-control mt-2'} name={'Name'} type={'text'}
                   placeholder={'Enter your first name'} required/>
            <input className={'form-control mt-2'} name={'Surname'} type={'text'}
                   placeholder={'Enter your last name'} required/>
            <input className={'form-control mt-2'} name={'Email'} type={'text'}
                   placeholder={'Enter your Email'} required/>
            <input className={'form-control mt-2'} name={'password'} type={'text'}
                   placeholder={'Enter a new Password'} required/>
            <button className={'mt-2 btn btn-outline-secondary'} type={'submit'}>Submit</button>
        </form>
    )
}


export default SignupModal