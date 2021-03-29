'use strict';

const pool = require('../database/pool');
const poolPromise = pool.promise();

const getAllUsers = async () => {
  const [rows] = await poolPromise.query("SELECT * FROM wop_user");
  const modifiedRows = rows.map(row => {
    delete row.password;
    return row;
  })
  return modifiedRows;
};

const getUser = async userId => {
  const [rows] = await poolPromise.execute("SELECT * FROM wop_user WHERE user_id = ?", [userId]);
  delete rows[0].password;
  return rows[0];
};

const addUser = async user => {
  const [rows] = await poolPromise.execute("INSERT INTO wop_user (name, email, password) VALUES(?, ?, ?)", [user.name, user.email, user.passwd]);
  return rows;
};

const getUserLogin = async params => {
  const [rows] = await poolPromise.execute("SELECT * FROM wop_user WHERE email = ? AND password = ?", params);
  return rows[0];
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin
};
