const Room = require("./Room.js");
const RoomModuleFactory = require("./RoomModuleFactory.js");

module.exports = class Map {
  constructor(rooms) {
    this.rooms = rooms;
  }

  //This function creates all the <Room>s and all the modules it contains: <Exit>, <Item>, <Npc>
  createRooms = () => {
    this.rooms = this.rooms.map((roomDetails) => {
      return new Room(roomDetails.id, {
        name: roomDetails.name,
        first: roomDetails.first,
        exits: roomDetails.exits.map((exit) => {
          return new RoomModuleFactory("exit", {
            direction: exit.direction,
            node: exit.node,
            distance: exit.distance,
          });
        }),
        description: roomDetails.description,
        items: roomDetails.items
          ? roomDetails.items.map((item) => {
              return new RoomModuleFactory("item", {
                id: item.id,
                name: item.name,
                description: item.description,
                triggers: item.triggers,
                equipable: item.equipable,
                attackDescription: item.attackDescription,
                damage: item.damage,
              });
            })
          : [],
        npcs: roomDetails.npcs
          ? roomDetails.npcs.map((npc) => {
              return new RoomModuleFactory("npc", {
                id: npc.id,
                name: npc.name,
                details: npc.details,
                actOptions: npc.actOptions,
                stats: npc.stats,
                friendly: npc.friendly,
              });
            })
          : [],
      });
    });
  };
};
