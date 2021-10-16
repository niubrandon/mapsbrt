/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

module.exports = function(router, database) {
  router.get("/", (req, res) => {
    database.getAllMaps()
      .then(maps => {
        res.send({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //if authenticated user - user created maps
  //can change route name
  router.get("/me", (req, res) => {
    //dummy
    userId = 1;
    database.getAllUserMaps(userId)
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
