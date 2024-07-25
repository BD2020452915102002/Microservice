const {postController} = require('../controller')
const app = require("express/lib/application");

const postApi = (app, container)=>{
    const {version}= container.resolve('serverSettings')
    app.post(`/api/${version}/post/add`,postController(container))
    app.get(`/api/${version}/post/:id`,)
    app.get(`/api/${version}/post/getByUser/:id`,)
    app.get(`/api/${version}/post/getByCategory/:id`,)
    app.delete(`/api/${version}/post/:id`,)
    app.put(`/api/${version}/post/:id`,)
}
module.exports = { postApi }
