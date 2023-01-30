import React from 'react';
import {GoogleCredentialResponse, GoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import {useAppDispatch} from "../redux/hooks";
import {loginWithGoogle} from "../redux/Features/user/userActions";
import {closeModal} from "../redux/Features/overlays/overlaysActions";

const GoogleConnect = () => {
    const dispatch = useAppDispatch()
    const handleLoginSuccess = (response: GoogleCredentialResponse) => {
        if (response.credential != null) {
            dispatch(closeModal())
            dispatch(loginWithGoogle(response))
        }
    }
    useGoogleOneTapLogin(
        {
            onSuccess: handleLoginSuccess,
        }
    )
    // useGoogleLogin(
    //     {
    //         onSuccess: handleLoginSuccess,
    //         onError: () => {console.log('error')},
    //     },
    // )
    return (
        <>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                    console.log('error')
                }}
                shape="pill"
                type="standard"
                useOneTap={true}
                ux_mode="popup"/>
        </>
    )
}

export default GoogleConnect;