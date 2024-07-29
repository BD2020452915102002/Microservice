const joi = require('joi')
const category = require('./category.model')(joi)
const categorySchemas = joi.object(category)

const schemaValidator = (categoryData)=>{
    return new Promise((resolve,reject)=>{
        if(!categoryData){
            reject(new Error('Category data does not exist'))
        }
        const {error,value} = categorySchemas.validate(categoryData)
        if(error) {
            reject(new Error(`invalid category schema: ${error}`))
        }
        resolve(value)
    })
}

module.exports = {schemaValidator}
