export const getGameState = (req, res) => {
    const tempState = new Array(100)
    for(let x=0;x<tempState.length;x++){
        tempState[x] = new Array(100)
        for(let y=0;y<tempState[x].length;y++){
            tempState[x][y] = Math.floor(Math.random()*10)
        }
    }
    res.send({state: tempState})
    res.end()
}