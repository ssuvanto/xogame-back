import { users } from '../users'

export const login = (req, res) => {
    //test with single user for now and without any authentication
    let token = null
    for(let u of users){
        if(u.uname === req.body.uname && u.pword === req.body.pword){
            token = u.token
            break
        }
    }
    if(token){
        //matched, send token
        res.status(200)
        res.send({token: token})
    } else {
        //no matches, send error
        res.status(401)
        res.send({error: 'Incorrect username or password'})
    }
    res.end()
}