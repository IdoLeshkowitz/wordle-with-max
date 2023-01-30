import {useForm} from "react-hook-form";
import {SignUpPayload} from "../../../../commonTypes/SignupRequestPayload";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {signUp} from "../../redux/Features/user/userActions";
import {GameStatus} from "../../redux/Features/game/gameSlice";
import {Spinner} from "react-bootstrap";
import {ErrorType} from "../../../../commonTypes/Errors";

const STRING_REGEX = /$[A-Za-z]+^/i;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
const SignupModal = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state)
    const {register, formState: {errors}, handleSubmit} = useForm<FormData>();
    if (state.game.status === GameStatus.pending) {
        return (
            <div className='modal-container d-flex align-items-center justify-content-center'>
                <Spinner animation="border" role="status"/>
            </div>
        )
    }
    const onSubmit = handleSubmit((data: FormData) => {
        const {firstName, lastName, email, password}: SignUpPayload = data;
        dispatch(signUp({firstName, lastName, email, password}))
    })
    return (
        <form
            onSubmit={onSubmit}
            onClick={(e) => {
                e.stopPropagation()
            }}
            onKeyUp={(e) => {
                e.stopPropagation()
            }
            }
            className='d-flex flex-column align-items-stretch justify-content-center modal-container'
        >
            <h1 className="text-light mb-4 align-self-center">Sign-Up</h1>
            {state.errors.errors.includes(ErrorType.SIGNUP_ERROR) && <label>🤷‍seems like email address is in use</label>}
            <div className='form-group'>
                {errors['firstName'] && <label>🙅‍Please enter a valid first name</label>}
                <input className={'form-control'} type={'text'} placeholder={'Enter your first name'} {...register("firstName", {
                    pattern: /^[A-Za-z]+$/i,
                    required: true
                })}/>
            </div>
            <div className='form-group'>
                {errors['lastName'] && <label>🤔Please enter a valid last name</label>}
                <input className={'form-control mt-2'} type={'text'}
                       placeholder={'Enter your last name'} {...register("lastName", {
                    pattern: /^[A-Za-z]+$/i,
                    required: true
                })}/>
            </div>
            <div className='form-group'>
                {errors['email'] && <label>😪Invalid email. Please enter a valid email</label>}
                <input className={'form-control mt-2'} type={'text'}
                       placeholder={'Enter your email'} {...register("email", {pattern: EMAIL_REGEX, required: true})}/>
            </div>
            <div className='form-group'>
                {errors['password'] &&
                    <label>🙀Password must be 8 characters, with at least one letter and one number</label>}
                <input className={'form-control mt-2'} type={'text'}
                       placeholder={'Enter password'} {...register("password", {
                    pattern: /^[A-Za-z]+$/i,
                    required: true
                })}/>
            </div>
            <div className="form-group d-sm-grid">
                <button className={'mt-4 btn btn-outline-secondary btn-sm '} type={'submit'}>Submit</button>
                <button className='mt-4 btn btn-outline-secondary btn-sm align-self-start '>back to log in</button>
            </div>
        </form>
    )
}

export default SignupModal