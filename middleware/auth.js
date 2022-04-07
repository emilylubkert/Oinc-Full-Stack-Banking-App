const firebase = require('../config/firebase')

const authMiddleware = async (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(403).json({message: 'No token provided'})
    }
    const token = req.headers.authorization?.split(' ')[1];
    try {
        const decodedValue = await firebase.auth().verifyIdToken(token)

        if (decodedValue) {
            req.firebaseUser = decodedValue
            return next()
        }
        res.status(403).json({message: 'Not authenticated correctly'})

    } catch (error){
        res.status(500).json(error.message)
    }
}

module.exports = authMiddleware