import {NonEvaluatedGuess} from '../../../../commonTypes/NonEvaluatedGuess'
import request from 'supertest'
import app from '../../app'


describe('POST /evaluate', function () {
    it('should return the evaluated guesses', function () {
        //TARGET WORD : HUMAN
        //GUESSED : HBADE
        const guesses: NonEvaluatedGuess[] = [
            {letter: 'h', index: 0},
            {letter: 'b', index: 1},
            {letter: 'a', index: 2},
            {letter: 'd', index: 3},
            {letter: 'e', index: 4},
        ]
        const expected = [
            {letter: 'H', index: 0, correctness: 'correctPlace'},
            {letter: 'B', index: 1, correctness: 'notInTargetWord'},
            {letter: 'A', index: 2, correctness: 'incorrectPlace'},
            {letter: 'D', index: 3, correctness: 'notInTargetWord'},
            {letter: 'E', index: 4, correctness: 'notInTargetWord'},
        ]
        return request(app)
            .post('/evaluate')
            .set('sessionid', '0')
            .send({guesses})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toEqual(expected)
            })
    })
    it('should return 404 for invalid session', function () {
        const guesses: NonEvaluatedGuess[] = [
            {letter: 'h', index: 0},
            {letter: 'b', index: 1},
            {letter: 'a', index: 2},
            {letter: 'd', index: 3},
            {letter: 'e', index: 4},
        ]
        return request(app)
            .post('/evaluate')
            .set('sessionid', '-1')
            .send({guesses})
            .expect(404)
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.body).toEqual({
                    message: 'Session not found',
                })
            })
    })
})

