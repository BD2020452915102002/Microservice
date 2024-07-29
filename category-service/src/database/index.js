const  connectDb  = require('./mongo').connect
const { ObjectId } = require('mongodb')

module.exports = { connectDb, ObjectId }
