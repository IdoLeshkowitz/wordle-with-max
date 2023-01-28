/* global google */
import {RouterProvider} from 'react-router-dom';
import {router} from './router/router';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import React, {useEffect} from 'react';
import './styles/index.scss';
import GoogleConnect from "./components/GoogleConnect";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Modals from "./components/Modals";
import {useAppDispatch} from "./redux/hooks";
import jwtDecode from "jwt-decode";
import {User} from "../../commonTypes/User";
import {setCurrentUser} from "./redux/Features/user/userActions";
import 'bootstrap/dist/css/bootstrap.min.css';

const GOOGLE_CLIENT_ID = '1053600571463-0bq8ik99to3hlq78e8ao7rdkcasmo3qn.apps.googleusercontent.com';

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const cachedUser = localStorage.getItem('token');
        console.log(cachedUser)
        if (cachedUser){
            const {email,firstName,lastName} = jwtDecode(cachedUser) as User;
            dispatch(setCurrentUser({email,firstName,lastName}))
        }
    },[])
    return (<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Modals/>
                <RouterProvider router={router}/>
        </GoogleOAuthProvider>);
}

export default App;
