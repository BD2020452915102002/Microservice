const dbSettings = {
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    dbName:  process.env.MONGODB_NAME || 'microservice',
}

const serverSettings = {
    port: process.env.PORT || 8888,
    shaKey: process.env.SHAKEY || '123abc@',
    version: 'v1',
}

const serverHelper =  () => {
    const jwt = require('jsonwebtoken')
    const { shaKey } = serverSettings
    console.log('vaoday')
    function encodePassword (pass) {
        console.log('aaaaa')
        return pass
    }

    function validateToken (token) {
        try {
            return jwt.verify(token, shaKey)
        } catch (e) {
            return null
        }
    }

    function getUserToken (user) {
        return jwt.sign( user , shaKey, { expiresIn: '24h' })
    }

    return { encodePassword, validateToken, getUserToken }
}
module.exports = { dbSettings, serverSettings , serverHelper: serverHelper()}
