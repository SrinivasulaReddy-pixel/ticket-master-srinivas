const User = require('../model/User')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')

module.exports.register = (req, res)=>{
    const body = req.body
    const user = new User(body)
    user.save()
    .then(user =>{
        res.json(_.pick(user, ['id', 'username', 'email']))
    })
    .catch(err =>{
        res.json(err)
    })
}

module.exports.login = (req, res)=>{
    const body = req.body
   
    User.findByCredentials(body.email, body.password)
    .then((user)=>{
        return user.generateToken()
    })
    .then((token)=>{
        res.setHeader('x-auth', token).json({token:token})
    })
    .catch((err)=>{
        //res.json({errors:err})
        res.json(err)
    })
}

module.exports.account = (req, res)=>{
   const {user} = req
   res.json( _.pick(user,['_id','username','email' ] ))
}

module.exports.logout = (req, res)=>{
    const {user, token} = req

    User.findByIdAndUpdate(user._id, { $pull: { tokens: {token: token}}})
        .then(()=>{
            res.json({notice:'successfully logged out'})
        })
        .catch((err)=>{
            res.json(err)
        })
}