'use strict';

const catModel = require('../models/catModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');

const cat_get_list = async (req, res) => {
    res.json(await catModel.getAllCats());
};

const cat_get = async (req, res) => {
    res.json(await catModel.getCat(req.params.id));
};

const cat_create_post = async (req, res) => {
    try {
        const filename = await resize.makeThumbnail(req.file.path, req.file.filename);
        const coordinates = await imageMeta.getCoordinates(req.file.path);
        res.json(await catModel.addCat(req.body, filename, coordinates));
    } catch (e) {
        console.error(e);
        res.status(500);
    }
};

const cat_update_put = async (req, res) => {
    try {
        res.json(await catModel.updateCat(req.body));
    } catch (e) {
        console.error(e);
        res.status(500);
    }
};

const cat_delete = async (req, res) => {
    try {
        res.json(await catModel.deleteCat(req.params.id));
    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

module.exports = {
    cat_get_list,
    cat_get,
    cat_create_post,
    cat_update_put,
    cat_delete
};