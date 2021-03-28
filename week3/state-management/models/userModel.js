'use strict';

const users = [
    {
      user_id: 1,
      name: 'Foo Bar',
      email: 'foo@bar.fi',
      password: 'foobar',
    },
    {
      user_id: 2,
      name: 'Bar Foo',
      email: 'bar@foo.fi',
      password: 'barfoo',
    },
];

const getUserLogin = (username, password) => {
    return users.filter(user => user.email === username && user.password === password)[0];
};

const getUserById = id => {
    return users.filter(user => user.user_id == id)[0];
};

module.exports = {
    getUserLogin,
    getUserById
};