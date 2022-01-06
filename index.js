const constants = require("./constants.js");
let express = require("express");
let fetch = require("node-fetch");

let groups = require("./groups.js");
let channels = require("./channels.js");
let users = require("./users.js");

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.map = function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        app[key](route, a[key]);
        break;
    }
  }
};

app.map({
  "/:server": { // server ip/url:port OR "self" incase of self
    "/users": {
      get: go(users.list),
        "/:uid": {
          get: go(users.get)
        }
    },
    "/groups": {
      get: go(groups.list),
      "/:gid": {
        get: go(groups.get),
        "/subscribe": {
          post: go(groups.subscribe)
        },
        "/unsubscribe": {
          post: go(groups.unsubscribe)
        },
        "/:cid": {
          get: go(channels.getMessages),
          post: go(channels.addMessage),
          "/:mid": {
            get: go(channels.getMessage),
            patch: go(channels.editMessage),
            delete: go(channels.deleteMessage)
          }
        }
      }
    }
  }
});

let server = app.listen(constants.server.port, constants.server.ip);

function go(f) {
  return (req, res) => {
    if (req.params.server == "self" || req.params.server == constants.server.hostname + ":" + constants.server.port) {
      // local request
      // handling locally.. (duh)
      f(req.params, req.body)
        .then(j => res.json(j))
        .catch(e => {
          res.status(e.status).json({
            error: e.code,
            info: e.info
          });
        });
    } else {
      // request to remote server
      // relaying request to server..
      fetch("http://" + req.params.server + "/self/" + req.path.split("/").slice(2).join("/"), {
          method: req.method,
          body: req.method == "GET" ? undefined : req.body,
          headers: {
            "Content-Type": req.headers["Content-Type"]
          }
        })
        .then(r => {
          r.json().then(j => res.json(j)).catch(_ => {
            let e = constants.errors.malformedJson;
            res.status(e.status).json({
              error: e.code,
              info: e.info
            });
          })
        })
        .catch(er => {
          console.log(er);
          let e = constants.errors.connectionFailed;
          res.status(e.status).json({
            error: e.code,
            info: e.info
          });
        })
    }
  }
}
