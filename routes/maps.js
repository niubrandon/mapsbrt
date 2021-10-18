/*
 * All routes for MAPS are defined here
 * Since this file is loaded in server.js into api/MAPS,
 *   these routes are mounted onto /widget
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

  // Get single map
  router.get("/:id", (req, res) => {
    database.getMapbyID(req.params.id)
      .then(
        maps => {
          // console.log('req params',req.params.id);
          res.send({ maps });
        })
      .catch(err => {
        // console.log('single map err?');
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
