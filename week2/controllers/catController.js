'use strict';

const catModel = require('../models/catModel');

const cat_get_list = async (req, res) => {
    res.json(await catModel.getAllCats());
};

const cat_get = async (req, res) => {
    res.json(await catModel.getCat(req.params.id));
};

const cat_create_post = async (req, res) => {
    res.json(await catModel.addCat(req.body, req.file.filename));
};

const cat_update_put = async (req, res) => {
    res.json(await catModel.updateCat(req.body));
};

const cat_delete = async (req, res) => {
    res.json(await catModel.deleteCat(req.params.id));
};

module.exports = {
    cat_get_list,
    cat_get,
    cat_create_post,
    cat_update_put,
    cat_delete
};