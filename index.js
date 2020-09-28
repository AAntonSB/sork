const Character = require("./Character.js");
const Commands = require("./Commands.js");
// function start() {
//   const map = new Map("mapfile.txt");

//   const name = read_player_name_from_command_line();
//   const player = new player(name); // namn, hp, saker

//   const items = read_items_from_item_file("itemfile.txt");

//   const world = new world(map, items, player, enemies);

//   const engine = Engine.instance();

//   while (!engine.done(world)) {
//     print(world.description());
//     print(world.options());

//     const selection = read_selection_from_command_line(); // npm i prompt

//     engine.playerAction(world, selection);
//     engine.update(world);
//   }

//   print_result(engine.result(world));
// }

function start() {
  const command = new Commands();
  const name = command.prompt("What is your name?");
  const player = new Character(name);
}

start();
