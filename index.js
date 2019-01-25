const {
  DeckboardExtension,
  extensionLog,
  INPUT_METHOD
} = require("deckboard-extension-kit");
const { shutdown } = require("wintools");

const inputSelections = [
  {
    label: "Power Option",
    value: "power-option",
    icon: "power-off",
    color: "#34495e",
    input: [
      {
        label: "Action",
        ref: "powerAction",
        type: INPUT_METHOD.INPUT_SELECT,
        items: [
          {
            label: "Shutdown",
            value: "shutdown"
          },
          {
            label: "Restart",
            value: "restart"
          }
        ]
      }
    ]
  }
];

const execute = (action, { powerAction }) => {
  extensionLog("info", `${action} ${powerAction}`);
  switch (action) {
    case "power-option": {
      switch (powerAction) {
        case "shutdown":
          shutdown.poweroff();
          break;
        case "restart":
          shutdown.restart();
          break;
        default:
          break;
      }
    }
    default:
      break;
  }
};

const extension = new DeckboardExtension(
  "Power Options",
  inputSelections,
  execute
);
module.exports = extension;
