import { db } from '../index'

export const getGameState = async(req, res) => {
    //get game from database by gameid
    const state = await db.collection('games').findOne({gameid: parseInt(req.params.id)})

    res.send({state: state})
    res.end()
}