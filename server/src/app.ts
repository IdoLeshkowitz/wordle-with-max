import express from 'express'
import cors from 'cors'
import sessionRouter from './controllers/sessions'
import evaluateRouter from './controllers/evaluate'
import bodyParser from 'body-parser'
import usersRouter from "./controllers/users";
import authRouter from "./controllers/auth";

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/session', sessionRouter)
app.use('/evaluate', evaluateRouter)
app.use('/user', usersRouter)
app.use('/auth', authRouter)
export default app