const Character = require("./Character.js");
const World = require("./World.js");
const Engine = require("./Engine.js");
const Map = require("./Map.js");
const CombatManager = require("./CombatManager.js");
const { InputAction, ActionFacade } = require("./Action.js");
const game = require("./Game.json");

async function start() {
  console.clear();

  //Initiate all the classes
  const engine = new Engine(game);
  const player = new Character(await engine.prompt("My name is..."), {
    hp: 20,
  });
  const map = new Map(engine.unpackRooms());
  map.createRooms();
  const world = new World(map, player);
  const combatManager = new CombatManager(world);
  const actionFacade = new ActionFacade();

  actionFacade.initActionChain();

  console.clear();

  //The gameloop
  while (engine.done(world)) {
    world.printDescription();

    const inputAction = new InputAction(await engine.prompt(""));
    actionFacade.handleAction(inputAction.getInput().value.split(" "), world);

    const enemy = world.getEnemy();
    if (enemy) {
      if (!enemy.defeated) await combatManager.combatLoop(world.player, enemy);
    }
  }
  console.clear();
  console.log("You died");
}

start();
