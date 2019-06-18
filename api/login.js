const token = 'xogameauthorizationtoken'
//simple fixed array of users for now
const users = [{
    id: 0,
    uname: 'Tester',
    pword: 'testpw',
    token: 'user0token'
},{
    id: 1,
    uname: 'Usertest',
    pword: 'pwtesting',
    token: 'user1token'
},{
    id: 2,
    uname: 'Retset',
    pword: 'wptset',
    token: 'user2token'
}]

export const login = (req, res) => {
    //test with single user for now and without any authentication
    let token = null
    for(let u of users){
        if(u.uname === req.body.uname && u.pword === req.body.pword){
            token = u.token
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

export const check = (req, res, next) => {
    console.log('Checking token...')
    if(req.get('token') === token){
        console.log('Success, next')
        next()
    } else {
        console.log('Fail, 403')
        res.sendStatus(403)
    }
}