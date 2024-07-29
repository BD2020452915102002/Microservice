const categoryController = (container) => {
    const {schemaValidator} = container.resolve('models')
    const categoryRepo = container.resolve('repo')
    const addCategory = async (req, res) => {
        if (!req.user) {
            return res.status(401).send("Authentication is required and has failed or has not yet been provided")
        }
        const createBy = req.user._id
        const {name, displayName, description} = req.body
        try {
            const categoryValidator = await schemaValidator({name, displayName, createBy, description})
            await categoryRepo.addCategory(categoryValidator)
            return res.status(200).send('added category')
        } catch (err) {
            return res.status(400).send(err)
        }


    }
    const getCategoryById = async (req, res) => {
        const id = req.params.id
        try {
            const result = await categoryRepo.getCategoryById(id)
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err)
        }

    }
    const deleteCategoryById = async (req, res) => {
        const id = req.params.id
        try {
            await categoryRepo.deleteCategoryById(id)
            return res.status(200).send('deleted category')
        } catch (err) {
            return res.status(400).send(err)
        }
    }
    const updateCategoryById = async (req, res) => {
        const {name, displayName, description} = req.body
        const id = req.params.id
        try {
            await categoryRepo.updateCategoryById(id, {name, displayName, description})
            return res.status(200).send('updated category')
        }catch(err) {
            return res.status(400).send(err)
        }
    }
    return {addCategory, getCategoryById, deleteCategoryById, updateCategoryById}
}
module.exports = {categoryController}
