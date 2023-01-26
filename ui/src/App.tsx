import {RouterProvider} from 'react-router-dom';
import {router} from './router/router';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import React from 'react';
import './styles/index.scss'
function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>);
}

export default App;
