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
  commonItemStyles: {
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
  commonItemStyles: {
    "min-width": "0px",
    "max-width": "none",
    height: "100%",
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
  commonItemStyles: {
    width: "100%",
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

PRESETS["3-1-2"] = {
  name: "Fixed header w. fixed left and fluid body",
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
  commonItemStyles: {
    "min-width": "0px",
    "max-width": "none",    
    "min-height": "0px",
    "max-height": "none",
    "flex-shrink": "0",
    "flex-basis": "auto",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  itemStyles: {
    "item-0": {
      width: "100%",
      height: "50px",
      "flex-grow": "0",
    },
    "item-1": {
      width: "auto",
      height: "calc(100% - 50px)",
      "flex-grow": "1",
    },
    "item-2": {
      width: "auto",
      height: "calc(100% - 50px)",
      "flex-grow": "1",
    },
  },
};