const postController = (container) => {
    const {schemaValidator} = container.resolve('models')
    const postRepo = container.resolve('repo')

    const addPost = async (req, res) => {
        const newPost = req.body
        if (!req.user) {
            return res.status(401).send("Authentication is required and has failed or has not yet been provided")
        }
        newPost.owner = req.user._id
        if (newPost.categories) {
            if (typeof newPost.categories !== typeof []) {
                newPost.categories = [newPost.categories]
            }
        } else {
            newPost.categories = []
        }
        try {
            const newPostValid = await schemaValidator(newPost)
            await postRepo.addPost(newPostValid)
            return res.status(200).send('Added post')

        } catch (err) {
            return res.status(400).json({error: err.message})
        }
    }
    const getPostById = async (req, res) => {
        const id = req.params.id
        try {
            const postData = await postRepo.getPostById(id)
            if(postData === null){
                return  res.status(404).send('Not found post')
            }
            return res.status(200).send(postData)
        } catch (err) {
            return res.status(400).json({error: err.message})
        }
    }
    const getPostByUserId = async (req, res) => {
        const id = req.params.id
        try {
            const postData = await postRepo.getPostByUserId(id)
            if(postData === null){
                return  res.status(404).send('Not found post')
            }
            return res.status(200).send(postData)
        }catch(err) {
            return res.status(400).json({error: err.message})
        }
    }
    const getPostByCategoryId = async (req, res) => {
        const id = req.params.id
        try {
            const postData = await postRepo.getPostByCategoryId(id)
            if(postData === null){
                return  res.status(404).send('Not found post')
            }
            return res.status(200).send(postData)
        }catch(err) {
            return res.status(400).json({error: err.message})
        }
    }
    return {addPost, getPostById, getPostByUserId , getPostByCategoryId}
}
module.exports = {postController}
