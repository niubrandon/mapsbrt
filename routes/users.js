/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const cookieSession = require('cookie-session');
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);


module.exports = function(router, database) {

  /*
  check user login
  --need this function to return and promise so it can be further processed from login and register
  --login(params1, paramas2) paramas1: user object
  */

  const login = function(user, password) {
    console.log("function called login");
    return database.findUserFromUsername(user).then(data => {
      if (data) {
        if (bcrypt.compareSync(password, data.password)) {
          return data;
        } else {
          return null;
        }
      }

    });
  };

  exports.login = login;


  /*
register helper function
given input with user object when register new user and return a promise with user information
*/
  const register = function(user) {
    return database.findUserFromUsernameAndEmail(user).then(data => {
      if (data) {
        return data;
      } else {
        return null;
      }
    });
  };

  exports.register = register;

  /*
  user registration route
  -check if username or email is in system. if not proceed registration process
  */
  router.post('/register', (req, res) => {

    const user = req.body;
    register(user).then((data) => {

      if (!data) {
        user.password = bcrypt.hashSync(req.body.password, salt);
        database.addUser(user)
          .then(data => {
            if (!data) {
              res.send({error: "error from addUser query at server side"});
              return;
            }
            console.log("added user into database", data, data.id);
            req.session.userId = data.id;
            req.session.userName = data.username;

            res.send({user:{name: data.name, email: data.email, password: data.password, id : data.id}});

          })
          .catch(e => res.send(e));
      } else {
        res.status(401).send({error: "username or email already exists, please register with a different username or email"});
      }
    });
  });


  /*
  user login route

  */
  router.post('/login', (req, res) => {
    const {username, email, password} = req.body;
    login(req.body, req.body.password).then(data => {
      if (!data) {
        res.send({error: "error"});
        return;
      }
      req.session.userName = data.name;
      req.session.userId = data.id;
      res.send({user: {name: data.name, email: data.email, password: data.password, id : data.id}});
    })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(201).send("user successfully logout");
  });

  router.get("/fav/maps", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send("Error:User Not found");
      return;
    }
    database.getAllFavMapsOfUser(userId)
      .then(result => {
        let maps = result.map(v => ({...v, fav: true}))
        res.send({maps});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  /*
is this route obsolete?
*/
  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }
        res.send({user});
      })
      .catch(e => res.send(e));
  });

  //to add the map into the favorites
  router.post("/fav/:mapid/add", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.params.mapid;
    database.addToFav(userId, mapId)
      .then(fav => {
        res.send(true);
      })
      .catch(err => {
        res.send(err.message);
      });
  });

  //to remove it from fav
  router.post("/fav/:mapid/remove", (req, res) => {
    const userId = req.session.userId;
    const mapId = req.params.mapid;
    database.removeFromFav(userId, mapId)
      .then(fav => {
        res.send(true);
      })
      .catch(err => {
        res.send(err.message);
      });
  });


  return router;
};
