module.exports = class World {
  constructor(map, player) {
    this.map = map;
    this.items = items;
    this.player = player;
    this.currRoom = map.rooms[0];
    this.descriptionLogged = false;
  }

  description = () => {};
  options = () => {};

  attemptToChangeRooms(direction) {
    const e = this.currRoom.exits.find((exit) => exit.direction === direction);
    if (e) {
      console.log("You head off to the " + direction);
      this.currRoom = this.map.rooms.filter((room) => {
        return e.node === room.id;
      })[0];
      console.clear();
      this.descriptionLogged = false;
    } else {
      console.log("There is no path to the " + direction);
    }
  }

};
