const {userController} = require("../controller");
const userApi = (app, container) => {
    const {version} = container.resolve('serverSettings')
    app.post(`/api/${version}/user/register`,userController(container).register)
    app.post(`/api/${version}/user/login`,userController(container).login)
}

module.exports = {userApi}
