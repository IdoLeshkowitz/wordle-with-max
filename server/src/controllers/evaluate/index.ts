import {Router} from 'express'
import bodyParser from 'body-parser'
import {getSessionService, Session} from '../../services/session-service'
import {NonEvaluatedGuess} from '../../../../commonTypes/NonEvaluatedGuess'
import {Correctness, EvaluatedGuess} from '../../../../commonTypes/EvaluatedGuess'

async function evaluateGuesses(req, res) {
    const {word : targetWord} : Session= req.session
    const guesses : NonEvaluatedGuess[]= req.guesses
    const evaluatedGuesses: EvaluatedGuess[] = guesses.map((guess) => {
        let {letter, index} = guess
        letter = letter.toUpperCase()
        let correctness: Correctness = Correctness.notInTargetWord
        if (targetWord.includes(letter)) {
            correctness = Correctness.incorrectPlace
        }
        if (targetWord[index] === letter) {
            correctness = Correctness.correctPlace
        }
        return {
            letter,
            index,
            correctness,
        }
    })
    res.status(200).send(evaluatedGuesses)
}
export function isGuess(guess: NonEvaluatedGuess): guess is NonEvaluatedGuess {
    return 'letter' in guess && 'index' in guess
}
const validateGuesses = (req, res, next) => {
    const guesses = req.body || {}
    if (!guesses) {
        return res.status(400).send({message: 'Guesses are missing'})
    }
    if (!guesses.every(isGuess)) {
        return res.status(400).send('Guesses are not valid')
    }
    req.guesses = guesses
    next()
}
const validateSession = async (req, res, next) => {
    const {sessionid} = req.headers
    try {
        req.session = await getSessionService().one(sessionid)
    } catch {
        return res.status(404).send({message: 'Session not found'})
    }
    next()
}
const evaluateRouter = Router()
evaluateRouter.use(bodyParser.json())
evaluateRouter.use(bodyParser.urlencoded({extended: true}))
evaluateRouter.post('/',validateSession,validateGuesses, evaluateGuesses)
export default evaluateRouter