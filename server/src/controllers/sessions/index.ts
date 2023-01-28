import { getWordsService } from '../../services/words-service'
import { getSessionService } from '../../services/session-service'
import { Router } from 'express'
import bodyParser from 'body-parser'
import {body} from "express-validator";


async function createSession(req, res) {
    const word = await getWordsService().randomWord()
    const userId = req.headers.authorization
    const session = await getSessionService().create({
        word,
        userId,
    })
    res.send({sessionId : session.id})
}

const sessionRouter = Router()
sessionRouter.post('/', bodyParser.json(), createSession)
export default sessionRouter