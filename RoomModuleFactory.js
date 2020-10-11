class Exit {
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
    this.equipable = props.equipable || false;
    this.attackDescription = props.attackDescription || "";
    this.damage = props.damage || null;
  }
};


