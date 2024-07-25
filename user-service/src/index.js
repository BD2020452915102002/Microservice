const {connectDb} = require("./database");
const EventEmitter = require('events').EventEmitter
const mediator = new EventEmitter()
const { config } = require('./config')
const {initDI} = require("./di");
const repo = require("./repo")
const models = require('./models')
const util = require("./util")
const {start} = require("./server")

console.log('-- User service --')
console.log('Connecting to repository...')

process.on('uncaughtException', err => {
    console.error('Unhandled Exception', err)
})

connectDb(config.dbSettings, mediator)

mediator.on('DB connection error', err => {
    console.error('DB connect error',err)
})
mediator.on('DB connected', (db) => {
    console.log('Connected repository')
    const { dbSettings, serverSettings,  serverHelper } = config
    initDI({
        dbSettings,
        serverSettings,
        repo: repo.connectRepo(db),
        models,
        serverHelper,
        util
    }, mediator)
})
mediator.on('di.ready', container => {
    console.log('di ready, start app')
    start(container).then(app =>{
        console.log('Server start at port', app.address().port)
    })
})

