//Chain of command pattern
class Action {
  constructor() {
    if (this.constructor === Action) {
      throw new Error("AnAbstractClass can not be instantiated");
    }
  }

  setNextChain() {
    throw new Error("setNextChain() is not implemented");
  }
  respondToInput() {
    throw new Error("respondToInput() is not implemented");
  }
}

class InputAction {
  constructor(input) {
    this.input = input;
  }

  getInput() {
    return this.input;
  }
}

//#region  ACTIONS

class Go extends Action {
  constructor() {
    super();
    this.nextInChain;
  }

  setNextChain(nextChain) {
    this.nextInChain = nextChain;
  }
  respondToInput(request, world) {
    if (request[0] === "go" || request[0] === "head" || request[0] === "move") {
      world.attemptToChangeRooms(request[1]);
    } else {
      this.nextInChain.respondToInput(request, world);
    }
  }
}

class Examine extends Action {
  constructor() {
    super();
    this.nextInChain;
  }
  setNextChain(nextChain) {
    this.nextInChain = nextChain;
  }
  respondToInput(request, world) {
    if (request[0] === "examine" || request[0] === "inspect") {
      world.examineItem(request[1]);
    } else {
      this.nextInChain.respondToInput(request, world);
    }
  }
}

class Equip extends Action {
  constructor() {
    super();
    this.nextInChain;
  }
  setNextChain(nextChain) {
    this.nextInChain = nextChain;
  }
  respondToInput(request, world) {
    if (request[0] === "equip") {
      world.equipItem(request[1]);
    } else {
      this.nextInChain.respondToInput(request, world);
    }
  }
}

class Take extends Action {
  constructor() {
    super();
    this.nextInChain;
  }
  setNextChain(nextChain) {
    this.nextInChain = nextChain;
  }
  respondToInput(request, world) {
    if (request[0] === "take") {
      world.takeItem(request[1]);
    } else {
      this.nextInChain.respondToInput(request, world);
    }
  }
}

class Inventory extends Action {
  constructor() {
    super();
    this.nextInChain;
  }
  setNextChain(nextChain) {
    this.nextInChain = nextChain;
  }
  respondToInput(request, world) {
    if (request[0] === "inventory") {
      world.examineInventory(request[1]);
    } else {
      this.nextInChain.respondToInput(request, world);
    }
  }
}

class Help extends Action {
  constructor() {
    super();
    this.nextInChain;
  }
  setNextChain(nextChain) {
    this.nextInChain = nextChain;
  }
  respondToInput(request, world) {
    if (request[0] === "help") {
      console.log(
        //TODO find a way to do this programaticly to make scalability doable.
        "Currently available commands are: go, examine, equip, take and inventory."
      );
    } else {
      console.log(
        "command currently not implemented, type help for current list of commands."
      );
      // this.nextInChain.respondToInput(request, world);
    }
  }
}

//#endregion

//Facade pattern
class ActionFacade {
  constructor() {
    this.go = new Go();
    this.examine = new Examine();
    this.equip = new Equip();
    this.take = new Take();
    this.inventory = new Inventory();
    this.help = new Help();
  }

  handleAction(request, world) {
    this.go.respondToInput(request, world);
  }

  initActionChain() {
    this.go.setNextChain(this.examine);
    this.examine.setNextChain(this.equip);
    this.equip.setNextChain(this.take);
    this.take.setNextChain(this.inventory);
    this.inventory.setNextChain(this.help);
  }
}

module.exports = { InputAction, ActionFacade };
