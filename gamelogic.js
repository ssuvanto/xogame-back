import { db } from './index'

export const addMarkMsg = (data, res) => {
    console.log('Adding mark to ' + data.x + ', ' + data.y)
    res({type: 'markok', data:{x: data.x, y: data.y}})
}

async function addMarkToDBGame(gameid, x, y) {
    //TODO: implement updating
}