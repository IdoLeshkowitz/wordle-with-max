import {Router} from 'express'
import bodyParser from 'body-parser'
import {getSessionService} from '../../services/session-service'
import {NonEvaluatedGuess} from '../../../../commonTypes/NonEvaluatedGuess'
import {Correctness, EvaluatedGuess} from '../../../../commonTypes/EvaluatedGuess'

async function evaluateGuesses(req, res) {
    // const {sessionid} = req.headers
    // const {guesses} = req.body
    // const {word: targetword} = await getSessionService().one(sessionid)
    // const evaluatedGuesses: EvaluatedGuess = guesses.map((guess) => {
    //     const {letter, index} = guess
    //     let correctness: Correctness = Correctness.notInTargetWord
    //     if (targetword.includes(letter)) {
    //         correctness = Correctness.incorrectPlace
    //     }
    //     if (targetword[index] === letter) {
    //         correctness = Correctness.correctPlace
    //     }
    //     return {
    //         letter,
    //         index,
    //         correctness,
    //     }
    // })
    const justATest: EvaluatedGuess[] = [
        {
            letter     : 'a',
            index      : 0,
            correctness: Correctness.correctPlace
        },
        {
            letter     : 'b',
            index      : 1,
            correctness: Correctness.incorrectPlace

        },
        {
            letter     : 'c',
            index      : 2,
            correctness: Correctness.notInTargetWord
        },
        {
            letter     : 'd',
            index      : 3,
            correctness: Correctness.notInTargetWord
        },
        {
            letter     : 'e',
            index      : 4,
            correctness: Correctness.notInTargetWord
        }

    ]

    res.send(justATest)
}

export function isGuess(guess: NonEvaluatedGuess): guess is NonEvaluatedGuess {
    return 'letter' in guess && 'index' in guess
}

const validateGuesses = (req, res, next) => {
    const {guesses} = req.body || {}
    if (!guesses) {
        res.status(400).send({message: 'Guesses are missing'})
        return
    }
    if (!guesses.every(isGuess)) {
        res.status(400).send('Guesses are not valid')
        return
    }
    next()
}
const validateSession = async (req, res, next) => {
    const {sessionid} = req.headers
    try {
        const session = await getSessionService().one(sessionid)
    } catch {
        res.status(404).send(JSON.stringify({message: 'Session not found'}))
        return

    }
    next()
}
const evaluateRouter = Router()
evaluateRouter.use(bodyParser.json())
evaluateRouter.use(bodyParser.urlencoded({extended: true}))
evaluateRouter.post('/', evaluateGuesses)
export default evaluateRouter