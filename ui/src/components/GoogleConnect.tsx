import React from 'react';
import {GoogleCredentialResponse, GoogleLogin} from "@react-oauth/google";
import {useNavigate} from 'react-router-dom';
import jwtDecode from "jwt-decode";

const GoogleConnect = () => {
    const navigate = useNavigate();
    const handleLoginSuccess = (response: GoogleCredentialResponse) => {
        if (response.credential != null) {
            console.log(response.credential)
            navigate('/game');
        }
    }
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