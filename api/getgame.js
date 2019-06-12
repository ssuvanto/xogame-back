export const getGameState = (req, res) => {
    //for now generate fake game state based on game id (populate nth row)
    const tempState = new Array(100)
    for(let x=0;x<tempState.length;x++){
        tempState[x] = new Array(100).fill(0)
        tempState[x][parseInt(req.params.id) + 50] = 1
    }

    res.send({state: tempState})
    res.end()
}