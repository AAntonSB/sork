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
        this.chooseEnemyActOption(
          enemy,
          await this.engine.prompt(this.getEnemyActOptions(enemy))
        );
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

  //Displays and acts upon player inputs
  chooseEnemyActOption(enemy, choice) {
    const choiceZeroIndexed = choice.value - 1;

    const actOptionCount = this.actOptionCount[choiceZeroIndexed];
    const actOption = enemy.actOptions[choiceZeroIndexed].stages;

    console.log(actOption[actOptionCount]);

    this.setActOptionCount(choiceZeroIndexed, actOptionCount + 1);
    if (actOptionCount === actOption.length - 1) {
      //These are the different reactions too a finished act sequence
      //TODO Create a factory out of this to react to the different options for easier expantion (or maby a dictoinary)
      switch (enemy.actOptions[choiceZeroIndexed].onComplete) {
        case "loop":
          this.setActOptionCount(choiceZeroIndexed, 0);
          break;
        case "victory":
          this.victory = true;
          this.world.defeatedMonster();
          break;
        default:
          throw new Error("You need to implement this option");
      }
    }
  }

};
