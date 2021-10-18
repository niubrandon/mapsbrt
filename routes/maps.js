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

  // Get points of single map
  router.get("/:id/points", (req, res) => {
    database.getPointsbyMapID(req.params.id)
      .then(
        points => {
          // console.log('points param',req.params.id);
          res.send({ points });
        })
      .catch(err => {
        // console.log('single map err?');
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



/*
find user information from username
user is an object may contain username and password
*/
  const userInformation = function(user) {
    return database.findUserFromUsername(user).then(data => {
      console.log("finding user from finduser query", data.id);
      if (data) {
        return data.id;
      } else {
        return null;
      }
    });
  };

  exports.userInformation = userInformation;



  /*
  POST on create a map endpoint
  :id is username from loggedin user
  check cookie const userName = req.session.userName;
  find userId from username nested promise
  */

  router.post("/:id/addmap", (req, res) => {
    //check cookie first
    const userName = req.session.userName;
    const user = {
      username: userName
    };
    console.log("logged in as username from cookie", userName);
    userInformation(user).then(userId => {
      database.addMapFromAuthUser(req.body, userId).then(data => {
        res.status(202).send({data});
      }).catch(err => {
        res.status(500).json({error: "error"});
      });

    }).catch(err => {
    });

  });


  return router;
};
