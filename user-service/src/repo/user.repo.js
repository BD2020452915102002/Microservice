module.exports = function (mongoClient) {
    const addUser = async (user,passwordTool) => {
        const { username, name, isAdmin, createTime, password } = user;
        try {
            const userExists = await checkUserExists(user);
            if (!userExists) {
                const hashedPassword = await passwordTool.hash(password)
                const result = await mongoClient.collection('users').insertOne({
                    username,
                    name,
                    password: hashedPassword,
                    isAdmin,
                    createTime,
                });
                console.log(`New user created with the following id: ${result.insertedId}`);
            } else {
                throw new Error("User already exists!")
            }
        } catch (err) {
            console.error("Error adding user:", err.message)
            throw err
        }
    };

    const checkUserExists = async (user) => {
        try {
            const result = await mongoClient.collection('users').findOne({ username: user.username });
            return !!result;
        } catch (err) {
            console.error('DB connection error:', err)
            return false;
        }
    };

    const loginUser = async (user,passwordTool) => {
        try {
            const userRecord = await mongoClient.collection('users').findOne({ username: user.username });
            if (userRecord) {
                const passwordMatches =await passwordTool.compare(user.password,userRecord.password)
                if (passwordMatches) {
                    return userRecord;
                } else {
                    throw new Error("Password doesn't match")
                }
            } else {
                throw new Error("User does not exist")
            }
        } catch (err) {
            throw err;
        }
    };

    return { addUser, checkUserExists, loginUser };
};
