/* global google */
import {RouterProvider} from 'react-router-dom';
import {router} from './router/router';
import React, {useEffect} from 'react';
import './styles/index.scss';
import {GoogleOAuthProvider, useGoogleOneTapLogin} from "@react-oauth/google";
import Modals from "./components/Modals";
import {useAppDispatch} from "./redux/hooks";
import jwtDecode from "jwt-decode";
import {User} from "../../commonTypes/User";
import {setCurrentUser} from "./redux/Features/user/userActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "./components/SideBar";
import Toasts from "./components/Toasts";
import {keyboardClicked} from "./redux/Features/keyboard/keyboardActions";

const GOOGLE_CLIENT_ID = '1053600571463-0bq8ik99to3hlq78e8ao7rdkcasmo3qn.apps.googleusercontent.com';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const cachedUser = localStorage.getItem('token');
        if (cachedUser) {
            const {email, firstName, lastName} = jwtDecode(cachedUser) as User;
            dispatch(setCurrentUser({email, firstName, lastName}))
        }
    }, [])
    useEffect(() => {
        window.addEventListener('keyup', (e) => {
            if (e.key){
            dispatch(keyboardClicked(e.key.toUpperCase()))
            }
        })
    }, [])
    return (<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Modals/>
        <SideBar/>
        <RouterProvider router={router}/>
    </GoogleOAuthProvider>);
}

export default App;
