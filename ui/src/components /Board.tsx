const emptyGuess :
const Board = (props : any)=>{
    const {numberOfTiles, allGuesses} = props
    return (
        <div className="board">
            {Array(numberOfTiles).fill(0).map((_, index) => {
                return <Tile key={index} guess={allGuesses[index]} />
            })}
        </div>
    )
}

const Tile = (props : any)=>{
    const {guess} = props
    return (
        <div className="board-tile">
            {guess.letter}
        </div>
    )

}

export default Board