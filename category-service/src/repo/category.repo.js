module.exports = (mongoClient, {ObjectId}) => {
    const addCategory = async (categoryData) => {
        const createBy = new ObjectId(categoryData.createBy)
        try {
            return await mongoClient.collection('categories').insertOne({...categoryData, createBy})
        } catch (err) {
            throw err
        }
    }
    const getCategoryById = async (id) => {
        try {
            return await mongoClient.collection('categories').findOne({_id: new ObjectId(id)})
        } catch (err) {
            throw err
        }
    }
    const deleteCategoryById = async (id) => {
        try {
            return await mongoClient.collection('categories').deleteOne({_id: new ObjectId(id)})
        } catch (err) {
            throw err
        }
    }
    const updateCategoryById = async (id, dataUpdate)=>{
        const updateDoc = {};
        if (dataUpdate) {
            for (const [key, value] of Object.entries(dataUpdate)) {
                updateDoc[key] = value
            }
        } else throw new Error('Updated post content is empty')

        try {
            console.log(updateDoc)
            return await mongoClient.collection('categories').updateOne({_id: new ObjectId(id)}, {$set : updateDoc})
        }catch(err) {
            throw err
        }
    }
    return {addCategory, getCategoryById, deleteCategoryById, updateCategoryById}
}
