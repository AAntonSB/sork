const Engine = require("./Engine.js");

module.exports = class CombatManager {
  constructor(world) {
    this.actOptionCount = [];
    this.victory = false;
    this.world = world;
    this.engine = new Engine();
  }

};
