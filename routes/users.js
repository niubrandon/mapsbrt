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
      console.log("finding user from finduser query", data);
      if (data) {
        if (bcrypt.compareSync(password, data.password)) {
          console.log("user is in database", data);
          return data;
        } else {
          console.log("user is not in the database");
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
  //brandon addUser feature
  router.post('/register', (req, res) => {
    const user = req.body;
    console.log("recevied post ajax request from registration",user);
    user.password = bcrypt.hashSync(req.body.password, salt);
    database.addUser(user)
      .then(data => {
        if (!data) {
          res.send({error: "error"});
          return;
        }
        console.log("register user and added into database", data);
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

    console.log("received post ajax request from user login", req.body);
    login(req.body, req.body.password).then(data => {
      console.log("return after the password check", data);
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


  //obselete code. doesn't return the json object to client
  //check dababase if user exist and check password
  /*  database.findUserFromUsername(user).then(data => {
      //check if user if it exits verify the return from db if it is undefine
      if (!data) {
        console.log("user is not existed in database");
        res.send({error: "error"});
        return;
      } else {
      //check userpassword
        console.log("result from database when user login", userPassword, data.password,data);
        if (bcrypt.compareSync(userPassword,data.password)) {

          //create session cookie
          req.session.userName = data.name;
          res.status(201).send({data: {name: data.name, email: data.email, password: data.password}});
          console.log("correct password");
        } else {
          console.log("wrong password");
          res.status(401).send("password is wrong");
        }
      }

    }).catch(e => res.send(e));
  //create a session cookie
  });
*/

  return router;
};
