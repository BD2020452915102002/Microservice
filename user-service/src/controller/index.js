const userController = (container) => {
    const {schemaValidator} = container.resolve('models')
    const userRepo = container.resolve('repo')
    const {getUserToken} = container.resolve('serverHelper')
    const {passwordTool} = container.resolve('util')
    const login = async (req, res) => {
        const {username, password} = req.body
        if (!username) {
            return res.status(400).send({error: 'Username is required'})
        }
        if (!password) {
            return res.status(400).send({error: 'Password is required'})
        }
        try{
            const user = await userRepo.loginUser({username, password} , passwordTool)
            return res.status(200).json({token: getUserToken(user), user: user})
        }
        catch(e) {
            return res.status(400).json({error: e.message})
        }

    }
    const register = async (req, res) => {
        const newUser = req.body
        try {
           const newUserValidate = await schemaValidator(newUser)
            await userRepo.addUser(newUserValidate,passwordTool)
            return res.status(201).send('User registered');
        } catch (error) {
            if(error.message === "User already exists!") return res.status(400).json({ error: error.message })
            return res.status(500).send({error: 'something went wrong'})
        }
    }

    return {login,  register}
}
module.exports = {userController}
