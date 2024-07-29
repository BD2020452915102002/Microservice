const {postController} = require('../controller')

const postApi = (app, container)=>{
    const {version}= container.resolve('serverSettings')
    const {addPost, getPostById, getPostByUserId, getPostByCategoryId, deletePost, updatePost} = postController(container)
    app.post(`/api/${version}/post/add`,addPost)
    app.get(`/api/${version}/post/:id`,getPostById)
    app.get(`/api/${version}/post/getByUser/:id`,getPostByUserId)
    app.get(`/api/${version}/post/getByCategory/:id`,getPostByCategoryId)
    app.delete(`/api/${version}/post/:id`,deletePost)
    app.put(`/api/${version}/post/:id`,updatePost)
}
module.exports = { postApi }
