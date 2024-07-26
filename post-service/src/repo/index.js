
const repo = (mongoClient ,options) => {
    return require('./post.repo')(mongoClient, options)
}
const connectRepo = (dbPool , options) => {
    if (!dbPool) throw new Error('Connect DB failed')
    return repo(dbPool , options)
}
module.exports = {connectRepo}
