const prompts = require("prompts");

module.exports = class Engine {
  //Singelton class
  constructor(game) {
    if (Engine.exists) {
      return Engine.instance;
    }
    this.game = game;

    Engine.instance = this;
    Engine.exists = true;
    return this;
  }
  //returns false once the player dies (Planed to be expanded on so the gamemaker can set the conditions)
  done = (world) => {
    return world.player.stats.hp > 0;
  };
  }
};
