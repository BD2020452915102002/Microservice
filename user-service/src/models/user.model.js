module.exports = (joi) => {
    let options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }
    return {
        username: joi.string().regex(/^[a-z0-9_-]+$/i).required(),
        name: joi.string().min(1).max(16).required(),
        isAdmin: joi.boolean().required(),
        password: joi.string().min(8).required(),
        repeatPassword: joi.string().min(8).required().valid(joi.ref('password')),
        createTime: joi.string().empty('').default(() => new Date().toLocaleString('vi-VN', options))
    }
}
