const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const {userApi} = require("../api/user.api")
const bodyParser = require("body-parser")
const start = (container)=>{
    return new Promise((resolve,reject)=>{
        const {port}  = container.resolve('serverSettings')
        const repo = container.resolve('repo')
        if (!repo) {
            reject(new Error('The server must be started with a connected repository'))
        }
        if (!port) {
            reject(new Error('The server must be started with an available port'))
        }
        const app = express()
        morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
        app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(helmet())
        userApi(app, container)
        const server = app.listen(port, () => resolve(server))
    })
}
module.exports = {start}
