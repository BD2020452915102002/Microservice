module.exports = (mongoClient, {ObjectId}) => {
    const addPost = async (postData) => {
        let {categories, owner} = postData
        try {
            categories = categories.map((e) => new ObjectId(e))
            owner = new ObjectId(owner)
            await mongoClient.collection('posts').insertOne({...postData, owner, categories})
        } catch (e) {
            throw new Error('Failed to insert post data')
        }
    }
    const removePost = async () => {
    }
    const getPostById = async (idPost) => {
        try {
            return await mongoClient.collection('posts').findOne({_id: new ObjectId(idPost)})
        } catch (err) {
            throw err
        }
    }
    const getPostByUserId = async (userId) => {
        try {
            return await mongoClient.collection('posts').find({owner: new ObjectId(userId)}).toArray()
        } catch (err) {
            throw err
        }
    }
    const getPostByCategoryId = async (categoryId) => {
        try {
            return await mongoClient.collection('posts').find({categories: {$in: [categoryId]}}).toArray()
        } catch (err) {
            throw err
        }
    }
    const deletePost = async () => {
    }
    const updatePost = async () => {
    }
    return {addPost, removePost, getPostById, getPostByUserId, getPostByCategoryId, deletePost, updatePost}
}
