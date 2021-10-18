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
  router.get("/", (req, res) => {
    database.getUsers()
      .then(users => {
        res.send({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });




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
  user registration route
  --fix edge case later if username and email is already in the database
  */
  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(req.body.password, salt);
    database.addUser(user)
      .then(data => {
        if (!data) {
          res.send({error: "error"});
          return;
        }
        req.session.userName = data.username;
        res.send({user:{name: data.name, email: data.email, password: data.password}});

      })
      .catch(e => res.send(e));
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
      res.send({user: {name: data.name, email: data.email, password: data.password}});
    })
      .catch(e => res.send(e));
  });

  router.post('/logout', (req, res) => {
    req.session = null;
    res.status(201).send("user successfully logout");
  });

  router.get("/fav/maps", (req, res) => {
    userId = req.session.userId;
    if (!userId) {
      res.error("Not found");
      return;
    }
    database.getAllFavMapsOfUser(userId)
      .then(maps => {
        res.send({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
