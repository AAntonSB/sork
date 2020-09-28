module.exports = class World {
  constructor(map, items, player, enemies) {
    this.map = map;
    this.items = items;
    this.player = player;
    this.enemies = enemies;
  }

  description = () => {};
  options = () => {};
};
