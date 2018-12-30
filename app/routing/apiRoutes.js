// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

 

  // API POST Requests

  app.post("/api/friends", function(req, res) {
    var friend = req.body;
    var match;
    var lowestDiff = 100;
    for(let i in friendsData){
      var diff = 0;
      for(let k in friendsData[i].score){
        diff += Math.abs(friend.score[k] - friendsData[i].score[k]);
      }
      if(diff < lowestDiff){
        lowestDiff = diff;
        match = friendsData[i];
      }

    }
    friendsData.push(friend);
    res.json(match);
  });

};
