import { db } from '../index'
import { gameInfo } from '../gamelogic'
import { users } from '../users'

export const getGameState = async(req, res) => {
    const token = req.get('token')
    console.log('Gamestate request, token:', token)
    //verify token/get userid
    let id = null
    for(let u of users){
        if(u.token === token){
            id = u.id
            console.log('Token verified!')
            break
        }
    }
    if(id === null){
        //no such token
        console.log('Token failure!')
        res.status(403) //Forbidden
        res.send({error: 'Authentication failure'})
        res.end()
        return
    }

    //verify user in requested game
    for(let g of gameInfo){
        if(g.gameid === parseInt(req.params.id)){
            //found game
            console.log('Game:',g.gameid)
            if(g.player_ids.x === id || g.player_ids.o === id){
                //player in the game: OK!
                //get game from database by gameid
                console.log('Player verified! Sending data...')
                const game = await db.collection('games').findOne({gameid: parseInt(req.params.id)})
                res.send(game)
                res.end()
                return
            } else {
                //not this player's game
                console.log('Wrong player.')
                res.status(403)
                res.send({error: 'You are not in this game!'})
                res.end()
                return
            }
        }
    }
    console.log('Game not found.')
    res.sendStatus(404)
 
}