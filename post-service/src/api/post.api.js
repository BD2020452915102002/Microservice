const {postController} = require('../controller')

const postApi = (app, container)=>{
    const {version}= container.resolve('serverSettings')
    const {addPost} = postController(container)
    app.post(`/api/${version}/post/add`,addPost)
    // app.get(`/api/${version}/post/:id`,)
    // app.get(`/api/${version}/post/getByUser/:id`,)
    // app.get(`/api/${version}/post/getByCategory/:id`,)
    // app.delete(`/api/${version}/post/:id`,)
    // app.put(`/api/${version}/post/:id`,)
}
module.exports = { postApi }
