const Joi = require('joi');
const resData = require('../helper/response');

module.exports = {

    resetPassword: async (req, res, next) => {
        const response = Joi.object({
            newPassword: Joi.string().min(6).required(),
            confirmNewPassword: Joi.string().min(6).required(),
            otp_code: Joi.number().min(6).required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    updatePassword: async (req, res, next) => {
        const response = Joi.object({
            newPassword: Joi.string().min(6).required(),
            confirmNewPassword: Joi.string().min(6).required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    updateUser: async (req, res, next) => {
        const response = Joi.object({
            name: Joi.string().required().min(6).max(30),
            username: Joi.string().required().min(6).max(30),
            telp: Joi.number().required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    register: async (req, res, next) => {
        const response = Joi.object({
            name: Joi.string().required(),
            username: Joi.string().required(),
            image: Joi.string().allow(null).allow(''),
            telp: Joi.number().required(),
            password: Joi.string().min(6),
            confrimPassword: Joi.string().min(6),
            email: Joi.string().email().required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    login: async (req, res, next) => {
        const response = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    order: async (req, res, next) => {
        const response = Joi.object({
            products: Joi.array().required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    statusOrder: async (req, res, next) => {
        const response = Joi.object({
            status: Joi.string().required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    product: async (req, res, next) => {
        const response = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            category_id: Joi.number(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },

    category: async (req, res, next) => {
        const response = Joi.object({
            name: Joi.string().required(),
        }).validate(req.body);

        if (response.error) {
            return res.status(400).json(resData.failed(response.error.details[0].message));
        }

        next();
    },
};