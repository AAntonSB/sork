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

  //#region ITEMHANDLING

  examineItem(value) {
    const item = this.findItem(value);
    if (!item) return;
    console.log(item.description);
  }

  }
  }

  equipItem(value) {
    const item = this.findItem(value);
    if (item.equipable === true) {
      this.player.setActive(item);
      console.log("You equiped " + item.name);
    } else {
      console.log("item is not equipable");
    }
  }

  //returns item with matching id
  findItem(input) {
    return this.currRoom.items.filter((item) => {
      if (input === item.id) {
        return item;
      }
    })[0];
  }

  //#endregion

};
