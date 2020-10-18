const prompts = require("prompts");

module.exports = class Engine {
  //Singelton class
  constructor(game) {
    if (Engine.exists) {
      return Engine.instance;
    }
    this.game = game;
    this.conditions = [];

    Engine.instance = this;
    Engine.exists = true;
    return this;
  }

  //returns false once the player dies (Planed to be expanded on so the gamemaker can set the conditions)
  done = (world) => {
    return world.player.stats.hp > 0;
  };

  //utility that stops the code for ms milliseconds
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //prompts npm
  prompt = async (message) => {
    return await prompts({
      type: "text",
      name: "value",
      message: message,
    });
  };

  getGame() {
    return this.game;
  }

  unpackRooms() {
    return this.game.map;
  }
};
