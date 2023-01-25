import { Router, BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Welcome } from '../Pages/Welcome';
import Game from '../Pages/Game';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/game',
        element: <Game />,
    },
]);
