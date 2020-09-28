const prompts = require("prompts");

module.exports = class Commands {
  prompt = async (message) => {
    return await prompts({
      type: "text",
      name: "value",
      message: message,
    });
  };
};
