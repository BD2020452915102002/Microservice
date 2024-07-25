const postController = (container) => {
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
    }
    return {addPost}
}
module.exports = {postController}
