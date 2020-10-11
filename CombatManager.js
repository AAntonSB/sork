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
      await this.playerActions(player, enemy);
      console.clear();
    }
  }

  //Displays and acts upon player inputs
  async playerActions(player, enemy) {
    const action = await this.engine.prompt(`OPTIONS
    1. Attack
    2. Act
    3. Examine
    4. RUN
    `);
    console.clear();
    switch (action.value) {
      case "1":
        if (Object.values(player.active).length > 0) {
          console.log(
            player.active.attackDescription + " at the " + enemy.name
          );
          enemy.stats -= player.active.damage;
        } else {
          console.log("You started a fight without a weapon!?!?");
        }
        break;
      case "2":
        break;
      case "3":
        console.log(enemy.details);
        break;
      case "4":
        // roll for a chance to escape, if you succeed return to room you came from
        break;
      default:
        console.log(
          "you need to type one of the following numbers to chose an option."
        );
        break;
    }
    await this.engine.prompt("");
    console.clear();
  }

};
