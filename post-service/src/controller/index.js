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
            if(postData === null || postData === undefined || postData.length  === 0) {
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
            if(postData === null || postData === undefined || postData.length  === 0){
                return  res.status(404).send('Not found post')
            }
            return res.status(200).send(postData)
        }catch(err) {
            return res.status(400).json({error: err.message})
        }
    }
    const deletePost = async (req, res) => {
        const id = req.params.id
        if (!req.user) {
            return res.status(401).send("Authentication is required and has failed or has not yet been provided")
        }
        try {
            const postData = await postRepo.getPostById(id)
            if(postData === null){
                return  res.status(404).send('Not found post want to delete')
            }
            await postRepo.deletePost(id)
            return res.status(200).send(`post with id:${id} successfully deleted`)
        }catch(err) {
            return res.status(400).json({error: err.message})
        }
    }
    const updatePost = async (req, res) => {
        if (!req.user) {
            return res.status(401).send("Authentication is required and has failed or has not yet been provided")
        }
        const { id } = req.params
        const { content, title, categories, description} = req.body
        const updateFields = {}
        if (title) updateFields.title = title;
        if (content) updateFields.content = content;
        if (categories) updateFields.categories = categories;
        if (description) updateFields.description = description;

        if (Object.keys(updateFields).length === 0) {
            return res.status(401).send('Not found post want to update')
        }
        try {
            await postRepo.updatePost(id, updateFields)
            return res.status(200).send('updated post')

        }catch(err) {
            return res.status(400).json({error: err.message})
        }
    }
    return {addPost, getPostById, getPostByUserId , deletePost, getPostByCategoryId, updatePost}
}
module.exports = {postController}
