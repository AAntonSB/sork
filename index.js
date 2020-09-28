const prompts = require("prompts");
const Character = require("./Character.js");
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

async function prompt(value) {
  return await prompts({
    type: "text",
    name: "value",
    message: value,
  });
}

function start() {
  const done = false;
  const player = new Character(
    prompt(
      "Welcome traveller, if you intend to claim the treasures contained within the tombs of SORK then you shall give your name..."
    )
  );

  // while (!done) {}
}

start();
