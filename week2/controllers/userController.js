'use strict';

const e = require('express');
const userModel = require('../models/userModel');

const user_get_list = (req, res) => {
    res.json(userModel.users);
};

const user_get = (req, res) => {
    const users = userModel.users.filter(user => {
        return user.id === req.params.id;
    });
    delete users[0].password;
    res.json(users[0]);
};

module.exports = {
    user_get_list,
    user_get
};