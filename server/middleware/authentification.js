let jwt = require('jsonwebtoken')

module.exports=function(req,res,next){
    try {
        let token = req.headers.token
        let user = jwt.verify(token,'ini rahasia')
        req.user =user
        next()
    } catch (error) {
        console.log('error')
    }
}