// https://www.digitalocean.com/community/tutorials/js-factory-pattern

let registeredRoomModules = {};

registeredRoomModules["exit"] = class Exit {
  constructor(props) {
    this.direction = props.direction;
    this.node = props.node;
    this.distance = props.distance;
  }
};

class Item {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.triggers = props.triggers || [];
  }
}

//Bridge factory
class Weapon extends Item {
  constructor(props) {
    super(props);
    this.equipable = props.equipable || false;
    this.attackDescription = props.attackDescription || "";
    this.damage = props.damage || null;
  }
}

class Tool extends Item {
  constructor(props) {
    super(props);
  }
}

class StaticItem extends Item {
  constructor(props) {
    super(props);
  }
}

registeredRoomModules["item"] = class ItemFactory {
  static createItem(props) {
    if (props.id === "sword") {
      return new Weapon(props);
    }

    if (props.id === "torch") {
      return new Tool(props);
    }

    if (props.static) {
      return new StaticItem(props);
    }
    console.log(props);
    throw new Error("uknown item");
  }
};

registeredRoomModules["npc"] = class Npc {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.details = props.details;
    this.actOptions = props.actOptions || [];
    this.stats = props.stats || {};
    this.friendly = props.friendly || false;
  }
};
//The abstract factory class, creates room
module.exports = class RoomModuleFactory {
  static createExit(props) {
    return new registeredRoomModules["exit"](props);
  }
  static createItem(props) {
    return registeredRoomModules["item"].createItem(props);
  }
  static createNpc(props) {
    return new registeredRoomModules["npc"](props);
  }
};
