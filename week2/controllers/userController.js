'use strict';

const userModel = require('../models/userModel');

const user_get_list = async (req, res) => {
    try {
        res.json(await userModel.getAllUsers());
    } catch (e) {
        console.error(e);
        res.status(500).json({msg: "Internal Server Error"});
    }
    
};

const user_get = async (req, res) => {
    try {
        res.json(await userModel.getUser(req.params.id));
    } catch (e) {
        console.error(e);
        res.status(500);
    }
    
};

const user_create_post = async (req, res) => {
    try {
        res.json(await userModel.addUser(req.body));
    } catch (e) {
        console.error(e);
        res.status(500);
    }   
};

module.exports = {
    user_get_list,
    user_get,
    user_create_post
};