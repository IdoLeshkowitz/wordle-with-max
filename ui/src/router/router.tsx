import {createBrowserRouter} from 'react-router-dom'
import Game from '../Pages/Game'
import Modals from '../components /Modals';
import {Welcome} from "../Pages/Welcome";

export const router = createBrowserRouter([
                                              {
                                                  path   : '/',
                                                  element: <><Modals/></>,
                                                  children:[
                                                      {
                                                            path   : '/',
                                                            element: <Welcome/>
                                                      },
                                                      {
                                                            path   : '/game',
                                                            element: <Game/>
                                                      }
                                                  ]
                                              },
                                          ])
