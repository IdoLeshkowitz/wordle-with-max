import {app} from '../index'
import request from 'supertest';
import { EvaluatedGuess } from '../../../ui/src/redux/Features/guesses/guessesSlice';

const mockEvalArr:any = [{letter: 'J', index: 1, correctness: null, status: 'unchecked'}, {
    letter: 'M',
    index: 0,
    correctness: null,
    status: 'unchecked'
}, {letter: 'J', index: 2, correctness: null, status: 'unchecked'}, {
    letter: 'L',
    index: 1,
    correctness: null,
    status: 'unchecked'
}];
const mockAnswer: Evaluation[] = [{letter: 'J', index: 1, correctness: 'notInTargetWord', status: 'checked'}, {
    letter: 'M',
    index: 0,
    correctness: 'correctPlace',
    status: 'checked'
}, {letter: 'J', index: 2, correctness: 'notInTargetWord', status: 'checked'}, {
    letter: 'L',
    index: 1,
    correctness: 'incorrectPlace',
    status: 'checked'
}];
describe('should return eval checked', () => {
    it("should return eval checked", () => {
        return request(app)
            .post('/send')
            .send(mockEvalArr)
            .expect(200)
            .expect(mockAnswer)

    })
    it("should return hello ", () => {
        return request(app)
            .get('/')
            .expect(200);
    })
})
