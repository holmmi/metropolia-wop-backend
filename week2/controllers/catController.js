'use strict';

const catModel = require('../models/catModel');

const cat_get_list = (req, res) => {
    res.json(catModel.cats);
};

const cat_get = (req, res) => {
    const cats = catModel.cats.filter(cat => {
        return cat.id === req.params.id
    });
    res.json(cats[0]);
};

module.exports = {
    cat_get_list,
    cat_get
};