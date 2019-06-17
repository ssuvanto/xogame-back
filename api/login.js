const token = 'xogameauthorizationtoken'

export const login = (req, res) => {
    //test with single user for now and without any authentication
    console.log(req.body.uname,'logging in')
    res.send({token: token})
    res.end()
}

export const check = (req, res, next) => {
    console.log('Checking token...')
    if(req.get('token') === token){
        console.log('Success, next')
        next()
    } else {
        console.log('Fail, 401')
        res.sendStatus(401)
    }
}