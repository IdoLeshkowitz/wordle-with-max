import { isGuess } from './index'
import { NonEvaluatedGuess } from '../../../../commonTypes/NonEvaluatedGuess'
import request from 'supertest'
import  app  from '../../app'

describe('isGuess', function() {
    it('should return true if guess is a NonEvaluatedGuess', function() {
        const guesses: NonEvaluatedGuess[] = [
            { letter: 'a', index: 0 },
            { letter: 'b', index: 1 },
            { letter: 'c', index: 2 },
        ]
        expect(guesses.every(isGuess)).toBe(true)
    })
    it('should return false if guess is not a NonEvaluatedGuess', function() {
        const guesses: any [] = [
            { letter: 'a', index: 0 },
            { letter: 'b' },
            { letter: 'c', index: 2 },
        ]
        expect(guesses.every(isGuess)).toBe(false)
    })

})
describe('/evaluate', function() {
    it('should return 400 if guesses are not valid', function() {
        const guesses: any [] = [
            { letter: 'a', index: 0 },
            { letter: 'b' },
            { letter: 'c', index: 2 },
        ]
        request(app)
            .get('/evaluate/1')
            .send({ guesses })
            .expect(400)
    })
    it('should return 404 if session is not found', function() {
        const guesses: NonEvaluatedGuess[] = [
            { letter: 'a', index: 0 },
            { letter: 'b', index: 1 },
            { letter: 'c', index: 2 },
        ]
        request(app)
            .get('/evaluate/1')
            .send({ guesses })
            .expect(404)
    });
})
