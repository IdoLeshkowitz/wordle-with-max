/* global google */
import {RouterProvider} from 'react-router-dom';
import {router} from './router/router';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import React, {useEffect} from 'react';
import './styles/index.scss';
import GoogleConnect from "./matanhagever/GoogleConnect";
import {GoogleOAuthProvider} from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css';

const GOOGLE_CLIENT_ID = '1053600571463-0bq8ik99to3hlq78e8ao7rdkcasmo3qn.apps.googleusercontent.com';

function App() {
    return (<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </GoogleOAuthProvider>);
}

export default App;
