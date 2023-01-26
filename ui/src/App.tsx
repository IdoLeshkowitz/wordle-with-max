/* global google */
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import React, { useEffect } from 'react';
import './styles/index.scss';
const GOOGLE_CLIENT_ID = '1053600571463-0bq8ik99to3hlq78e8ao7rdkcasmo3qn.apps.googleusercontent.com';
function App () {
  function handleCallbackResponse (response : any) {
    if (response.credential) {
      // User successfully signed in.
      const id_token = response.credential;
      localStorage.setItem('id_token', id_token);
      console.log('id_token', id_token);
    } else {
      // User closed the sign-in dialog.
      console.log('User closed the sign-in dialog.');
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });
  }, []);
  return (
    <Provider store={store}>
      <button id='google-signin-button'>Sign in with Google</button>
      <RouterProvider router={router}/>
    </Provider>);
}

export default App;
