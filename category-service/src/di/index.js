const {createContainer, asValue} = require('awilix')
const initDI = ({ dbSettings, serverSettings, repo, models, serverHelper }, mediator) => {
    console.log('init DI')
    const container = createContainer()

    container.register({
        dbSettings: asValue(dbSettings),
        serverSettings: asValue(serverSettings),
        repo: asValue(repo),
        models: asValue(models),
        serverHelper: asValue(serverHelper),
    })
    mediator.emit('di.ready', container)
}

module.exports = { initDI }
