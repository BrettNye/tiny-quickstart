const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                req.context = jwt.verify(token, process.env.SUPER_SECRET_HASH_KEY);
                next();
            } catch(err){
                res.sendStatus(401)
                throw new AuthenticationError('Invalid/Expired token')
            }
        } else {
            res.sendStatus(401)
            throw new Error('Authentication token must be "Bearer <token>"')
        }
    } else {
        res.sendStatus(401)
        throw new Error('Authorization header must be provided')
    }
}