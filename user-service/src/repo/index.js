
const repo = (mongoClient) => {
    return require('./user.repo')(mongoClient)
}
const connectRepo = (dbPool) => {
    if (!dbPool) throw new Error('Connect DB failed')
    return repo(dbPool)
}
module.exports = {connectRepo}
