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



  //brandon addUser feature
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(req.body.password, salt);
    database.addUser(user)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userName = user.username;
        res.send("user registered!");
      })
      .catch(e => res.send(e));
  });
  return router;
};
