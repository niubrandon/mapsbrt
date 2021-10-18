/*
 * All routes for MAPS are defined here
 * Since this file is loaded in server.js into api/MAPS,
 *   these routes are mounted onto /MAPS
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
  router.get("/usermaps", (req, res) => {
    userId = req.session.userId;
    if (!userId) {
      res.error("Not found");
      return;
    }
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
