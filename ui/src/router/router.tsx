import {createBrowserRouter} from 'react-router-dom'
import Game from "../pages/Game";
import {Welcome} from "../pages/Welcome";


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
