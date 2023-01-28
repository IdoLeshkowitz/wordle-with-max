import {createBrowserRouter} from 'react-router-dom'
import Game from '../Pages/Game'
import Modals from '../components/Modals';
import {Welcome} from "../Pages/Welcome";

export const router = createBrowserRouter([
                                              {
                                                    path   : '/game',
                                                    element: <Game/>,
                                              },
                                              {
                                                    path   : '/',
                                                    element: <Welcome/>,
                                              }
                                          ])
