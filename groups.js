const constants = require("./constants.js");

let fakeGroups = [
  {
    id: 0,
    name: "sigma club",
    channels: [
      {
        id: 0,
        name: "general",
        messages: [],
        subscribers: []
      },
      {
        id: 1,
        name: "mod chan",
        messages: [],
        subscribers: []
      }
    ]
  },
  {
    id: 1,
    name: "woman server",
    channels: [
      {
        id: 0,
        name: "cringe",
        messages: [],
        subscribers: []
      },
      {
        id: 1,
        name: "lgbtqiaa++",
        messages: [],
        subscribers: []
      }
    ]
  }
];

module.exports.list = () => {
  return new Promise((succ, err) => {
    succ(fakeGroups);
  });
}

module.exports.get = (params) => {
  return new Promise((succ, err) => {
    module.exports.list().then(groups => {
      let g = groups.find(el => el.id == params.gid);
      if(g)
        succ(g);
      else
        err(constants.errors.groupDoesntExist)
    });
  });
}

module.exports.subscribe = (params, body) => {
  return new Promise((succ, err) => {
    module.exports.get(params).then(g => {
      // need permissions implemented here!!!!
      succ({})
    }).catch(err)
  });
}

module.exports.unsubscribe = (params, body) => {
  return new Promise((succ, err) => {
    module.exports.get(params).then(g => {
      // need permissions implemented here!!!!
      succ({})
    }).catch(err)
  });
}
