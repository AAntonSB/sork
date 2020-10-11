const prompts = require("prompts");

module.exports = class Engine {
  //Singelton class
  constructor(game) {
    if (Engine.exists) {
      return Engine.instance;
    }

    Engine.instance = this;
    Engine.exists = true;
    return this;
  }
  }
};
