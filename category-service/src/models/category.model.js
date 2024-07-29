module.exports = (joi) => {
    let options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }
    return {
        name: joi.string().regex(/^[a-zA-Z0-9'-]+$/i).required(),
        displayName: joi.string().required(),
        createBy: joi.string().required(),
        description: joi.string().empty('').default(''),
        createTime: joi.string().empty('').default(() => new Date().toLocaleString('vi-VN', options))
    }
}
