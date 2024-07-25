
const repo = (mongoClient) => {
    return require('./post.repo')(mongoClient)
}
const connectRepo = (dbPool) => {
    if (!dbPool) throw new Error('Connect DB failed')
    return repo(dbPool)
}
module.exports = {connectRepo}
