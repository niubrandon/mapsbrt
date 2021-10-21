/*
 * All routes for MAPS are defined here
 * Since this file is loaded in server.js into api/MAPS,
 *   these routes are mounted onto /widget
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


// 43.021625, -81.434419

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
          // console.log('req params',req.params.id);
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
    database.getPointsbyMapID(req.body.id)
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

  // Post a new point of single map
  // Should have 7 of inputs
  router.post("/:id/points", (req, res) => {
    // console.log('posting point');
    database.postPointsbyMapID(
      req.param.id, //Through the request
      req.body.title, //Form
      req.body.description, // Form
      req.body.lat, //How
      req.body.lng,
      req.body.imageUrl, // Form
      req.session.userId //User ID
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

  router.post("/:userid/deletemap/:id", (req, res) => {
    //check cookie first
    const mapId = req.params.id;
    const userName = req.session.userid;
    database.deleteMapFromAuthUser(mapId).then(data => {
      if (data) {
        res.status(201).send({data});
      }
    }).catch(err => {
      res.send({error: "error on delete map post request"});
    });

  });





  return router;
};

