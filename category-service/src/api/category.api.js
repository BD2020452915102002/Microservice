const { categoryController} = require('../controller')
const categoryApi = (app, container)=>{
    const {version} = container.resolve('serverSettings')
    const {addCategory, getCategoryById, deleteCategoryById, updateCategoryById} = categoryController(container)

    app.post(`/api/${version}/category/add`,addCategory)
    app.get(`/api/${version}/category/:id`,getCategoryById)
    app.delete(`/api/${version}/category/:id`,deleteCategoryById)
    app.put(`/api/${version}/category/:id`,updateCategoryById)
}
module.exports = {categoryApi}
