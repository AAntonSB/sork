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
};
