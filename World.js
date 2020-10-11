module.exports = class World {
  constructor(map, player) {
    this.map = map;
    this.player = player;
    this.currRoom = map.rooms[0];
    this.descriptionLogged = false;
  }

  //if description hasen't been printed ,prints it. If there is a condition for a different description checks for it
  printDescription() {
    if (this.descriptionLogged) return;

    this.descriptionLogged = true;

    if (this.currRoom.description.conditionals) {
      if (
        this.findMatchingArrayElement(
          Object.keys(this.currRoom.description.conditionals),
          this.player.effects
        )
      ) {
        return console.log(
          this.currRoom.description.conditionals[this.player.effects[0]]
        );
      }
    }
    return console.log(this.currRoom.description.default);
  }

  //returns true upon an array having a matching value against another
  findMatchingArrayElement(arr1, arr2) {
    return arr1.some(function (v) {
      return arr2.indexOf(v) >= 0;
    });
  }

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

  takeItem(value) {
    const item = this.findItem(value);
    if (!item) return console.log("that item can't be found in this room");
    const trigger = item.triggers.find(
      (trigger) => trigger.action === "take"
    );
    if (trigger) {
      this.player.addToInventory(item);
      console.log(trigger.description);
      const effect = trigger.effect;
      if (effect) this.player.addEffect(effect);
    } else {
      console.log("You can't touch this!!")
    }
  }

  equipItem(value) {
    const item = this.findItem(value);
    if (item.equipable) {
      this.player.setActive(item);
      console.log("You equiped " + item.name);
    } else {
      console.log("item is not equipable");
    }
  }

  //returns item with matching id
  findItem(input) {
    return this.currRoom.items.reduce((found, currentItem) => {
      if (found) return found;
      if (input === currentItem.id) return currentItem;
    });
  }

  //#endregion

  examineInventory() {
    console.log(
      "Inventory: " + this.player.displayInventory().join(", ") + "."
    );
  }

  getCurrentRoomValues() {
    return this.game.rooms[this.currRoom.id];
  }

  getEnemy() {
    const npc = this.currRoom.npcs;
    if (!npc) return undefined;
    return this.currRoom.npcs[0];
  }

  defeatedMonster() {
    return this.map.rooms.forEach((e) => {
      if (e.id === this.currRoom.id) {
        e.npcs[0].defeated = true;
      }
    });
  }
};
