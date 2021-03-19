'use strict';

const pool = require('../database/pool');
const poolPromise = pool.promise();

const getAllCats = async () => {
  const [rows] = await poolPromise.query("SELECT * FROM wop_cat");
  return rows;
};

const getCat = async (catId) => {
  const [rows] = await poolPromise.query("SELECT * FROM wop_cat WHERE cat_id = ?", [catId]);
  return rows;
};

const addCat = async (cat, filename) => {
  const [rows] = await poolPromise.query("INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES(?, ?, ?, ?, ?)",
    [cat.name, cat.age, cat.weight, cat.owner, filename]);
  return rows;
};

const updateCat = async cat => {
  const [rows] = await poolPromise.query("UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?",
    [cat.name, cat.age, cat.weight, cat.owner, cat.id]);
  return rows;
};

const deleteCat = async catId => {
  const [rows] = await poolPromise.query("DELETE FROM wop_cat WHERE cat_id = ?", [catId]);
  return rows;
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  updateCat,
  deleteCat
};