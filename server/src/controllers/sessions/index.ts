import {getWordsService} from '../../services/words-service'
import {getSessionService} from '../../services/session-service'
import {Router} from 'express'
import bodyParser, {urlencoded} from 'body-parser'


async function createSession(req, res) {
    const word = await getWordsService().randomWord()
    const userId = req.headers.authorization
    const session = await getSessionService().create({
        word,
        userId,
    })
    res.send({sessionId: session.id})
}

async function endSession(req, res) {
    const {sessionid} = req.headers
    try {
        const {word} = await getSessionService().delete(sessionid)
        res.send({targetWord: word})
    } catch {
        res.status(404).send({message: 'Session not found'})
    }
}

const sessionRouter = Router()
sessionRouter.post('/', bodyParser.json(), createSession)
sessionRouter.delete('/', bodyParser.json(), urlencoded({extended: true}), endSession)
export default sessionRouter