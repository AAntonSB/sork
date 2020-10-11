const Room = require("./Room.js");
const RoomModuleFactory = require("./RoomModuleFactory.js");

module.exports = class Map {
  constructor(rooms) {
    this.rooms = rooms;
  }

  //This function creates all the <Room>s and all the modules it contains: <Exit>, <Item>, <Npc>
  createRooms = () => {
    this.rooms = this.rooms.map((room) => {
      return new Room(room.id, {
        name: room.name,
        first: room.first,
        exits: room.exits.map((exit) => {
          return RoomModuleFactory.createExit(exit);
        }),
        description: room.description,
        items: room.items
          ? room.items.map((item) => {
              return RoomModuleFactory.createItem(item);
            })
          : [],
        npcs: room.npcs
          ? room.npcs.map((npc) => {
              return RoomModuleFactory.createNpc(npc);
            })
          : [],
      });
    });
  };
};
