//dummy datas can be removed
const maps = require('../data/maps.json');
const users = require('../data/users.json');
const points = require('../data/points.json');
//db call
const db = require('../db/index');
/**
 *
 * @param {*} limit
 * @returns
 * to get all the maps
 */
const getAllMaps = function(limit = 10) {
  const availableMaps = {};
  for (let i = 1; i <= limit; i++) {
    availableMaps[i] = maps[i];
  }
  return Promise.resolve(availableMaps);
}
exports.getAllMaps = getAllMaps;

/**
 *
 * @param {*} userId
 * @param {*} limit
 * @returns
 */
const getAllUserMaps = function(userId, limit = 3) {
  const availableMaps = {};
  for (let i = 1; i <= limit; i++) {
    if (maps[i].creator_id === userId) {
      availableMaps[i] = maps[i];
    }
  }
  console.log(availableMaps);
  return Promise.resolve(availableMaps);
}
exports.getAllUserMaps = getAllUserMaps;

/**
 *
 * @param {*} limit
 * @returns
 */
const getUsers = function(limit = 2) {
  return Promise.resolve(users);
}
exports.getUsers = getUsers;


/*
add user
*/
const addUser = function(user) {
  const {username, password, email} = user;
  const queryString =  `INSERT INTO users(name, email, password)
  VALUES($1, $3, $2)
  RETURNING *;
 `;
  return db.query(queryString, [username, password, email]);
};

exports.addUser = addUser;
