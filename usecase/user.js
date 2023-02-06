class UserUC {
    constructor(
        UserRepository,
        bcrypt,
        cloudinary,
    ) {
        this.UserRepository = UserRepository;
        this.bcrypt = bcrypt;
        this.cloudinary = cloudinary;
    }

    async getuserExists(username, email) {
        return await this.UserRepository.getUserExists(username, email);
    }

    async getUserById(id) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }
    
        let user = await this.UserRepository.getUserById(id);
        if (user === null) {
            result.reason = 'User not found';
            return result;
        }

        result.isSuccess = true;
        result.statusCode = 200;
        result.data = user;
        return result;
    }

    async updateUserProfile(id, userData) {
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        let user = await this.UserRepository.getUserById(id);
        if (user === null) {
            result.reason = 'User not found';
            return result;
        }

        let userExists = await this.UserRepository.getUserByUsername(userData.username);
        if(userExists.username === user.username) {
            result.reason = 'Please enter new username';
            result.statusCode = 400;
            return result;
        }

        if(userExists !== null) {
            result.reason = 'Username not available';
            result.statusCode = 400;
            return result;
        }

        user = await this.UserRepository.updateUser(userData, id);
        result.isSuccess = true;
        result.statusCode = 200;
        result.data = user;
        return result;
    }

    async updatePassword(user, id){
        let result = {
            isSuccess: false,
            statusCode: 404,
            reason: null,
            data: null,
        }

        if (user.password !== user.confirmPassword) {
            result.reason = 'Password and confirm password not match';
            result.statusCode = 400;
            return result;
        }

        let userById = await this.UserRepository.getUserById(id);
        if (userById === null) {
            result.reason = 'User not found';
            return result;
        }

        user.password = user.newPassword;
        user.password = this.bcrypt.hash(user.password, 10);

        await this.UserRepository.updateUser(user, id);
        result.isSuccess = true;
        result.statusCode = 200;

        return result;
    }
}

module.exports = UserUC;