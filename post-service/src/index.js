const {config} = require('./config')
const {connectDb, ObjectId} = require('./database')
const {initDI} = require("./di");
const EventEmitter = require('events').EventEmitter
const models = require('./models')
const repo = require('./repo')
const {start} = require("./server");
const mediator = new EventEmitter()

console.log('-- Post service --')
console.log('Connecting to repository...')

process.on('uncaughtException', err => {
    console.error('Unhandled Exception', err)
})
connectDb(config.dbSettings, mediator)

mediator.on('DB connection error', err =>{
    console.error('DB connect error',err)
})
mediator.on('DB connected', db =>{
    console.log('Connected repository')
    const {dbSettings,serverSettings,serverHelper} = config
    initDI({
        dbSettings,
        serverSettings,
        repo: repo.connectRepo(db, { ObjectId }),
        models,
        serverHelper,
    }, mediator)
})
mediator.on('di.ready', container => {
    console.log('di ready, start app')
    start(container).then(app =>{
        console.log('Server start at port', app.address().port)
    })
})
