const joi = require('joi')
const user = require('./user.model')(joi)
const userSchemas = joi.object(user)

const schemaValidator = (userData)=>{
    return new Promise((resolve,reject)=>{
        if(!userData){
            reject(new Error('User data does not exist'))
        }
        const {error,value} = userSchemas.validate(userData)
        if(error) {
            reject(new Error(`invalid user schema: ${error}`))
        }
        console.info(value)
        resolve(value)
    })
}

module.exports = {schemaValidator}
