module.exports = class Character {
  constructor({ hp }) {
    this.name = "";
    this.stats = { hp };
    this.inventory = [];
    this.effects = [];
    this.active = {};
  }

  //#region INVENTORY

  displayInventory() {
    return this.inventory.map((e) => {
      return e.name;
    });
  }

  addToInventory(item) {
    this.inventory.push(item);
  }

  removeFromInventory(item) {
    const itemIndex = this.inventory.indexOf((element) => element === item);
    this.inventory.splice(itemIndex, 1);
  }

  //#endregion

  //#region GETTERS AND SETTERS

  getStats() {
    return this.stats;
  }

  setStats(value) {
    this.stats = value;
  }

  setActive(value) {
    this.active = value;
  }

  getActive() {
    return this.active;
  }

  //#endregion

  addEffect(effect) {
    this.effects.push(effect);
  }
};
