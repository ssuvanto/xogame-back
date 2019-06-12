//This file is for testing
import { db } from '../index'

export const hello = (req, res) => {
    console.log(req.body)
    db.collection('stuff').insertOne(req.body, (err, r) => {
        if(err){
            console.log(err)
            res.sendStatus(500)
        } else {
            console.log('Documents inserted:',r.insertedCount)
            res.sendStatus(200)
        }
    })
}