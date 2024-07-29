
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
            return await mongoClient.collection('posts').find({categories: {$in: [new ObjectId(categoryId)]}}).toArray()
        } catch (err) {
            throw err
        }
    }
    const deletePost = async (id) => {
        try {
            await mongoClient.collection('posts').deleteOne({_id: new ObjectId(id)})
        }catch(err) {
            throw err
        }
    }
    const updatePost = async (id,updateFields) => {
        const updateDoc = {};
        if (updateFields) {
            for (const [key, value] of Object.entries(updateFields)) {
                updateDoc[key] = value
            }
        } else throw new Error('Updated post content is empty')

        try {
            console.log(updateDoc)
            return await mongoClient.collection('posts').updateOne({_id: new ObjectId(id)}, {$set : updateDoc})
        }catch(err) {
            throw err
        }
    }
    return {addPost, getPostById, getPostByUserId, getPostByCategoryId, deletePost, updatePost}
}
