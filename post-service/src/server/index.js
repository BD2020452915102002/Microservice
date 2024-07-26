const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const {postApi} = require("../api/post.api");
const start = (container) => {
    return new Promise((resolve, reject) => {
        const {port} = container.resolve('serverSettings')
        const {validateToken} = container.resolve('serverHelper')
        const repo = container.resolve('repo')
        if (!repo) {
            reject(new Error('The server must be started with a connected repository'))
        }
        if (!port) {
            reject(new Error('The server must be started with an available port'))
        }
        const app = express()
        morgan.token('body', function (req, res) {
            return JSON.stringify(req.body)
        })
        app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(helmet())
        app.use(async (req, res, next) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1]
                try {
                    req.user = await validateToken(token)
                } catch (e) {
                    return res.status(401).json({err: e.message});
                }
            }
            next()
        })
        postApi(app, container)
        const server = app.listen(port, () => resolve(server))
    })
}

module.exports = {start}
