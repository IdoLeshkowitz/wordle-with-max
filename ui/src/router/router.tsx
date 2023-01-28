import { createBrowserRouter } from 'react-router-dom'
import { Welcome } from '../Pages/Welcome'
import Game from '../Pages/Game'
import GoogleConnect from "../components /GoogleConnect";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <><Welcome /><GoogleConnect></GoogleConnect></>,
    },
    {
        path: '/game',
        element: <Game />,
    },
])
