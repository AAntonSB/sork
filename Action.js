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
