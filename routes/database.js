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
const getMapbyID = function(mapid = 1) {
  // console.log('indb');
  const queryString =  `
  SELECT *
  FROM maps
  WHERE maps.id = $1
 `;
  return db.query(queryString, [mapid], false);
};
exports.getMapbyID = getMapbyID;

/**
 * GET points BY the map ID
 * @param {*} mapid
 * @returns
 * A single map from maps
 */
const getPointsbyMapID = function(mapid = 1) {
  const queryString =  `
  SELECT *
  FROM points
  WHERE points.map_id = $1
 `;
  return db.query(queryString, [mapid], false);
};
exports.getPointsbyMapID = getPointsbyMapID;

/**
 * POST points to the map ID
 * @param {*} mapid
 * @returns
 * A single map from maps
 */
const postPointsbyMapID = function(mapid = 1) {
  const queryString =  `
  SELECT *
  FROM points
  WHERE points.map_id = $1
 `;
  return db.query(queryString, [mapid], false);
};
exports.postPointsbyMapID = postPointsbyMapID;

/**
 *
 * @param {*} userId
 * @param {*} limit
 * @returns
 */
const getAllUserMaps = function(userId, limit = 3) {
  const queryString =  `
  SELECT *
  FROM maps
  WHERE creator_id = $1
  LIMIT $2
 `;
 const values = [userId, limit];
 return db.query(queryString, values, false);
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

/**
 *
 * @param {*} userId
 */
const getAllFavMapsOfUser = function(userId, limit = 10) {
  const queryString = `
  SELECT * FROM maps
  JOIN favorites ON maps.id = map_id
  JOIN users ON users.id = user_id
  WHERE user_id = $1
  LIMIT $2;`

  const values = [userId, limit];
  return db.query(queryString, values, false);
}

exports.getAllFavMapsOfUser = getAllFavMapsOfUser;
