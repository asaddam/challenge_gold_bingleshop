const { Op } = require('sequelize');
const { User } = require('../models');

class UserRepository {
    constructor() {
        this.model = User;
    }

    async getUserByEmail(email) {
        return await this.model.findOne({
            where: {
                email: email
            }
        });
    }

    async getUserByUsername(username) {
        return await this.model.findOne({
            where: {
                username: username
            }
        });
    }

    async getUserById(id) {
        return await this.model.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['password', 'is_admin']
            }
        });
    }

    async getUserExists(username, email) {
        return await this.model.findOne({
            where: {
                [Op.or]: [
                    {username: username},
                    {email: email}
                ]
            }
        });
    }

    async updateUser(user, id) {
        return this.model.update(user, {
            where: {
                id: id
            }
        });
    }
}

module.exports = UserRepository;