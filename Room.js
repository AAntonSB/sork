//acts as a javascript builder
module.exports = class Room {
  constructor(id, { name, exits, description, items, npcs } = {}) {
    this.id = id;
    this.name = name;
    this.exits = exits;
    this.description = description;
    this.items = items;
    this.npcs = npcs;
  }
};
