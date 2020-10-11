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
