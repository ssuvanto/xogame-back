import { db } from './index'

export let gameInfo = []

export const addMarkMsg = (data, res) => {
    console.log('Adding mark to ' + data.x + ', ' + data.y)
    addMarkToDBGame(data.id, data.x, data.y)
    res({type: 'markok', data:{x: data.x, y: data.y}})
}

export const createGames = async() => {
    const find = await db.collection('games').find({}).toArray()
    if(find.length === 0){
        console.log('No games yet, make them')
        const empty = []
        for(let i=0;i<100;i++){
            empty[i] = []
            for(let j=0;j<100;j++){
                empty[i][j] = 0
            }
        }
        const docs = []
        for(let i=0;i<10;i++){
            //make the games a little bit different each
            const board = []
            for(let j=0;j<empty.length;j++){
                const copy = empty[j].slice()
                if(j === i+50){
                    copy.fill(1)
                }
                board.push(copy)
            }
            docs.push({gameid: i, player_ids: {x: 0, o: 1}, next_player: 'x', board: board})
        }
        db.collection('games').insertMany(docs, (err, res) => {
            if(!err){
                console.log('Inserted documents')
            }
        })
    } else {
        console.log('Games collection already has stuff, dont make games')
    }
}

export const populateGameInfo = async() => {
    gameInfo = await db.collection('games').find({}, {projection: {
        gameid: true, 
        next_player: true,
        player_ids: true
    }}).toArray()
    console.log(gameInfo)
}

async function addMarkToDBGame(gameid, x, y) {
    const key = 'board.'+x+'.'+y
    const res = await db.collection('games').updateOne({gameid: gameid}, {$set: {[key]: 1}})
    console.log('Updated',res.modifiedCount,'document(s)')
}