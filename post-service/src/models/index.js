const joi = require('joi')
const post = require('./post.model')(joi)
const postSchema = joi.object(post)

const schemaValidator = (postData)=>{
    return new Promise((resolve, reject)=>{
        if (!postData){
            reject(new Error('Post data is missing'))
        }
        const {error ,value} = postSchema.validate(postData)
        if (error){
            reject(new Error(`Invalid post data format: ${error}`))
        }
        resolve(value)
    })
}
module.exports = {schemaValidator}
