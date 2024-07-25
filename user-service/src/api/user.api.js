const {userController} = require("../controller");
const userApi = (app, container) => {
    const {version} = container.resolve('serverSettings')
    const {register, login} = userController(container)
    app.post(`/api/${version}/user/register`,register)
    app.post(`/api/${version}/user/login`,login)
}

module.exports = {userApi}
