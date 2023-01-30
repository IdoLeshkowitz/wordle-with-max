import { isGuess } from './index'
import { NonEvaluatedGuess } from '../../../../commonTypes/NonEvaluatedGuess'
import request from 'supertest'
import  app  from '../../app'

// describe('isGuess', function() {
//     it('should return true if guess is a NonEvaluatedGuess', function() {
//         const guesses: NonEvaluatedGuess[] = [
//             { letter: 'a', index: 0 },
//             { letter: 'b', index: 1 },
//             { letter: 'c', index: 2 },
//         ]
//         expect(guesses.every(isGuess)).toBe(true)
//     })
//     it('should return false if guess is not a NonEvaluatedGuess', function() {
//         const guesses: any [] = [
//             { letter: 'a', index: 0 },
//             { letter: 'b' },
//             { letter: 'c', index: 2 },
//         ]
//         expect(guesses.every(isGuess)).toBe(false)
//     })
//
// })
// describe('/evaluate', function() {
//     it('should return 400 if guesses are not valid', function() {
//         const guesses: any [] = [
//             { letter: 'a', index: 0 },
//             { letter: 'b' },
//             { letter: 'c', index: 2 },
//         ]
//         request(app)
//             .post('/evaluate')
//             .send({ guesses })
//             .expect(400)
//     })
//     it('should return 404 if session is not found', function() {
//         const guesses: NonEvaluatedGuess[] = [
//             { letter: 'a', index: 0 },
//             { letter: 'b', index: 1 },
//             { letter: 'c', index: 2 },
//         ]
//         request(app)
//             .post('/evaluate')
//             .send({ guesses })
//             .expect(404)
//     });
//     it('should return 200 if session is found', function() {
//         const guesses: NonEvaluatedGuess[] = [
//             { letter: 'a', index: 0 },
//             { letter: 'b', index: 1 },
//             { letter: 'c', index: 2 },
//         ]
//         request(app)
//             .post('/evaluate')
//             .send({ guesses })
//             .expect(200)
//     })
// })

describe('POST /evaluate', function() {
    it('should return the evaluated guesses', function() {
        //TARGET WORD : HUMAN
        //GUESSED : HBADE
        const guesses :NonEvaluatedGuess[]=[
            { letter: 'h', index: 0 },
            { letter: 'b', index: 1 },
            { letter: 'a', index: 2 },
            { letter: 'd', index: 3 },
            { letter: 'e', index: 4 },
        ]
        const expected = [
            { letter: 'H', index: 0, correctness: 'correctPlace' },
            { letter: 'B', index: 1, correctness: 'notInTargetWord' },
            { letter: 'A', index: 2, correctness: 'incorrectPlace' },
            { letter: 'D', index: 3, correctness: 'notInTargetWord' },
            { letter: 'E', index: 4, correctness: 'notInTargetWord' },
            ]
        return request(app)
            .post('/evaluate')
            .set('sessionid', '0')
            .send({ guesses })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toEqual(expected)
            })
    })
    it('should return 404 for invalid session', function() {
        const guesses :NonEvaluatedGuess[]=[
            { letter: 'h', index: 0 },
            { letter: 'b', index: 1 },
            { letter: 'a', index: 2 },
            { letter: 'd', index: 3 },
            { letter: 'e', index: 4 },
        ]
        return request(app)
            .post('/evaluate')
            .set('sessionid', '-1')
            .send({ guesses })
            .expect(404)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toEqual({
                    message: 'Session not found',
                })
            })
    })
})

