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
        description: roomDetails.description,
        items: roomDetails.items
      });
    });
  };
};
