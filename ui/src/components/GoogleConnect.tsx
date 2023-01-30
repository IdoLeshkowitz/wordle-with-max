import React from 'react';
import {GoogleCredentialResponse, GoogleLogin, useGoogleOneTapLogin} from "@react-oauth/google";
import {useAppDispatch} from "../redux/hooks";
import {loginError, loginWithGoogle} from "../redux/Features/user/userActions";
import {closeModal} from "../redux/Features/overlays/overlaysActions";

const GoogleConnect = () => {
    const dispatch = useAppDispatch()
    const handleLoginSuccess = (response: GoogleCredentialResponse) => {
        if (response.credential != null) {
            dispatch(loginWithGoogle(response))
        }
    }
    return (
        <>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                    dispatch(loginError())
                }}
                shape="circle"
                type="icon"
                useOneTap={true}
                ux_mode="popup"
                />

        </>
    )
}

export default GoogleConnect;