import { db } from './index'

export const addMarkMsg = (data, res) => {
    console.log('Adding mark to ' + data.x + ', ' + data.y)
    addMarkToDBGame(data.id, data.x, data.y)
    res({type: 'markok', data:{x: data.x, y: data.y}})
}

async function addMarkToDBGame(gameid, x, y) {
    const key = 'state.'+x+'.'+y
    const res = await db.collection('games').updateOne({gameid: gameid}, {$set: {[key]: 1}})
    console.log('Updated',res.modifiedCount,'document(s)')
}