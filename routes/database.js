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
  const queryString =  `
  SELECT *
  FROM maps
  LIMIT $1
 `;
  return db.query(queryString, [limit], false);
};
exports.getAllMaps = getAllMaps;

/**
 * GET MAPS BY the map ID
 * @param {*} mapid
 * @returns
 * A single map from maps
 */
const getMapbyID = function(id = 1) {
  console.log('indb');
  const queryString =  `
  SELECT *
  FROM maps
  WHERE maps.id = $1
 `;
  return db.query(queryString, [id], false);
};
exports.getMapbyID = getMapbyID;

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
brandon add user
*/
const addUser = function(user) {
  const {username, password, email} = user;
  const queryString =  `INSERT INTO users(name, email, password)
  VALUES($1, $3, $2)
  RETURNING *;
 `;
  return db.query(queryString, [username, password, email], true);
};

exports.addUser = addUser;

/*
check user with id and eamil
--Temp limit one, fix later if have duplicate username
*/
const findUserFromUsername = function(user) {
 //const {username, password} = user;
  const queryString = `SELECT * FROM users WHERE name = $1 LIMIT 1`;
  return db.query(queryString, [user.username], true);
};

exports.findUserFromUsername = findUserFromUsername;
