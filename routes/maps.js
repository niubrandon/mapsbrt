/*
 * All routes for MAPS are defined here
 * Since this file is loaded in server.js into api/MAPS,
 *   these routes are mounted onto /widget
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

module.exports = function(router, database) {

  router.get("/", (req, res) => {
    const userId = req.session.userId;
    database.getAllMaps(userId)
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
    const userId = req.session.userId;
    if (!userId) {
      res.send("Error:User Not Found");
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

  // Get single map
  router.get("/:id", (req, res) => {
    database.getMapbyID(req.params.id)
      .then(
        maps => {
          res.send({ maps });
        })
      .catch(err => {
        console.log('single map err?');
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
          res.send({ points });
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Post a new point of single map
  // Should have 7 of inputs
  router.post("/:id/points", (req, res) => {
    // console.log('posting point');
    database.postPointsbyMapID(
      req.params.id,
      req.body.point_title,
      req.body.description,
      req.body.lat,
      req.body.lng,
      req.body.imageUrl,
      req.session.userId
    )
      .then(
        points => {
          res.status(202).send({points});
        })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Update a new point of single map
  // Should have 7 inputs
  router.put(`/points/:pointid/update`, (req, res) => {
    database.updatePoint(
      req.params.pointid,
      req.body.point_title,
      req.body.description,
      req.body.lat,
      req.body.lng,
      req.body.imageUrl,
      req.session.userId
    )
      .then(
        points => {
          res.status(202).send({points});
        })
      .catch(err => {
        // console.log('single map err?');
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // DELETE points of single map
  router.delete("/points/:pointsid/delete", (req, res) => {
    database.deletePoint(req.params.pointsid)
      .then(
        points => {
          console.log('points param',req.params.pointsid);
          console.log('points pointsid',req.params.pointsid);
          res.send({ points });
        })
      .catch(err => {
        // console.log('single map err?');
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
  check cookie const userName = req.session.userName;
  find userId from username nested promise
  */

  router.post("/:userid/addmap", (req, res) => {
    //check cookie first
    console.log("!!!!!post ajax call for addmap", req.body, req.params, req.session.userName);
    const userName = req.session.userName;
    const user = {
      username: userName
    };
    console.log("!!!!!logged in as username from cookie", userName);
    userInformation(user).then(userId => {
      database.addMapFromAuthUser(req.body, userId).then(data => {
        res.status(202).send({data});
      }).catch(err => {
        res.status(500).json({error: "error"});
      });

    });

  });


  /*
  POST on delete a map endpoint
  :id is the map id belong to the auth user
  need map id from ajax post call
  */

  router.delete("/:userid/deletemap/:id", (req, res) => {
    //check cookie first
    const mapId = req.params.id;
    const userName = req.session.userName;
    database.deleteMapFromAuthUser(mapId).then(data => {
      if (data) {
        res.status(201).send({data});
      }
    }).catch(err => {
      res.send({error: "error on delete map post request"});
    });

  });

  /*
  POST on update a map endpoint
  */

  router.put("/:userid/updatemap/:id", (req, res) => {
  //check cookie first

    const mapId = req.params.id;
    const map = req.body;
    const userId = req.params.userid;

    database.updateMapFromAuthUser(mapId, userId, map).then(data => {
      if (data) {
        res.status(201).send({data});
      }
    }).catch(err => {
      res.send({error: "error on update map post request"});
    });

  });







  return router;
};

