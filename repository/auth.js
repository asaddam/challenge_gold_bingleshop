const { User }  = require('../models');

class AuthRepository {
    constructor() {
        this.model = User;
    }

    async registerUser(user) {
        return await this.model.create(user);
    }

    async loginUser(username) {
        return await this.model.findOne({
            where: {
                username: username,
            }
        });
    }
}

module.exports = AuthRepository;