const HelpModal = () =>{
    return (<div className="modal_window">
        <div className="modal-container">
            <h1 className="text-dark">Learn To Play</h1>
            <h3 className="text-secondary">Guess the Wordle in 6 tries</h3>
            <hr/>
            <ul>
                <li>
                    <h4 className="text-dark">Each guess must be a valid 5-letter word.</h4>
                </li>
                <li>
                    <h4 className="text-dark">The color of the tiles will change to show how close your guesses are to the word.</h4>
                </li>
                <hr/>
                <li>
                    <h4 className="text-dark">Red means your guess is wrong.</h4>
                </li>
                <li>
                    <h4 className="text-dark">Purple means the letter is in the Wordle but it's place is incorrect.</h4>
                </li>
                <li>
                    <h4 className="text-dark">Green means you've struck gold and your guess is correct!</h4>
                </li>
            </ul>
            <hr/>
            <h2 className="text-dark">Good Luck!</h2>
        </div>
    </div>)
}

export default HelpModal