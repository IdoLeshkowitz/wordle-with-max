export interface EvaluatedGuess {
    letter: string,
    index: number,
    correctness: | 'correctPlace' | 'notInTargetWord' | 'incorrectPlace',
}