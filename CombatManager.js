const Engine = require("./Engine.js");

module.exports = class CombatManager {
  constructor(world) {
    this.actOptionCount = [];
    this.victory = false;
    this.world = world;
    this.engine = new Engine();
  }

  //loops through the combat system until a combat condition is met
  async combatLoop(player, enemy) {
    if (typeof enemy !== "object") return;

    this.initActOptionCount(enemy);

    console.clear();
    while (
      player.stats.hp >= 0 &&
      enemy.stats.hp >= 0 &&
      this.victory === false
    ) {
      console.clear();
    }
  }
      console.clear();
    }
  }

};
