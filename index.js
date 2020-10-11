const Character = require("./Character.js");
const World = require("./World.js");
const Engine = require("./Engine.js");
const Map = require("./Map.js");
const CombatManager = require("./CombatManager.js");
const { InputAction, ActionFacade } = require("./Action.js");
const game = require("./Game.json");

class Sork {
  constructor() {
    this.engine = new Engine(game);

    this.player = new Character({ hp: 20 });

    this.map = new Map(this.engine.unpackRooms());
    this.map.createRooms();

    this.world = new World(this.map, this.player);
    this.combatManager = new CombatManager(this.world);
    this.actionFacade = new ActionFacade();

    this.actionFacade.initActionChain();
  }

  async start() {
    try {
      console.clear();

      this.player.name = await this.engine.prompt("My name is...");
      console.clear();

      //The gameloop
      while (this.engine.done(this.world)) {
        this.world.printDescription();

        const inputAction = new InputAction(await this.engine.prompt(""));
        this.actionFacade.handleAction(
          inputAction.getInput().value.split(" "),
          this.world
        );

        const enemy = this.world.getEnemy();
        if (enemy) {
          if (!enemy.defeated)
            await combatManager.combatLoop(this.world.player, enemy);
        }
      }
      console.clear();
      console.log("You died");
    } catch (err) {
      console.error(err);
    }
  }
}

const sork = new Sork();

sork.start();
