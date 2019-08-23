const PRESETS = {};

PRESETS["default"] = {
  name: "Default",
  itemCount: 4,
  containerStyles: {
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "align-content": "stretch",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  commonStyles: {
    width: "auto",
    "min-width": "0px",
    "max-width": "none",
    height: "auto",
    "min-height": "0px",
    "max-height": "none",
    "flex-grow": "1",
    "flex-shrink": "0",
    "flex-basis": "auto",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
};

PRESETS["3-col-mid-fluid"] = {
  name: "Three columns with fluid center",
  itemCount: 3,
  containerStyles: {
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "align-content": "stretch",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  commonStyles: {
    "min-width": "0px",
    "max-width": "none",
    height: "auto",
    "min-height": "0px",
    "max-height": "none",
    "flex-shrink": "0",
    "flex-basis": "auto",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  itemStyles: {
    "item-0": {
      width: "50px",
      "flex-grow": "0",
    },
    "item-2": {
      width: "50px",
      "flex-grow": "0",
    },
    "item-1": {
      width: "auto",
      "flex-grow": "1",
    },
  },
};

PRESETS["3-row-mid-fluid"] = {
  name: "Fixed header &amp; footer w. fluid body",
  itemCount: 3,
  containerStyles: {
    "flex-direction": "column",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "align-content": "stretch",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  commonStyles: {
    width: "auto",
    "min-width": "0px",
    "max-width": "none",
    height: "50px",
    "min-height": "0px",
    "max-height": "none",
    "flex-shrink": "0",
    "flex-basis": "auto",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  itemStyles: {
    "item-0": {
      "flex-grow": "0",
    },
    "item-2": {
      "flex-grow": "0",
    },
    "item-1": {
      "flex-grow": "1",
    },
  },
};
