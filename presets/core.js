const PRESETS = {};

const SMALL = 100

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
    "padding": "0px"
  },
  commonItemStyles: {
    width: "auto",
    "margin": "0px",
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
    "margin": "0px",
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
      width: SMALL,
      "flex-grow": "0",
    },
    "item-2": {
      width: SMALL,
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
    "margin": "0px",
    width: "100%",
    "min-width": "0px",
    "max-width": "none",
    height: SMALL,
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
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "align-content": "stretch",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  commonItemStyles: {
    "margin": "0px",
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
      height: SMALL,
      "flex-grow": "0",
    },
    "item-1": {
      width: SMALL,
      height: `calc(100% - ${SMALL}px)`,
      "flex-grow": "0",
    },
    "item-2": {
      width: "auto",
      height: `calc(100% - ${SMALL}px)`,
      "flex-grow": "1",
    },
  },
};

PRESETS["table"] = {
  name: "Fixed size table",
  itemCount: 16,
  containerStyles: {
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "center",
    "align-items": "center",
    "align-content": "center",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
  commonItemStyles: {
    width: "100px",
    "margin": "0px",
    "min-width": "0px",
    "max-width": "none",
    height: "100px",
    "min-height": "0px",
    "max-height": "none",
    "flex-grow": "0",
    "flex-shrink": "0",
    "flex-basis": "auto",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
};

PRESETS["grid"] = {
  name: "Grid with 8px gutter",
  itemCount: 16,
  containerStyles: {
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "justify-content": "flex-start",
    "align-items": "flex-start",
    "align-content": "flex-start",
    "overflow-x": "auto",
    "overflow-y": "auto",
    "padding": "4px"
  },
  commonItemStyles: {
    width: "90px",
    margin: "4px",
    "min-width": "0px",
    "max-width": "none",
    height: "90px",
    "min-height": "0px",
    "max-height": "none",
    "flex-grow": "0",
    "flex-shrink": "0",
    "flex-basis": "auto",
    "overflow-x": "auto",
    "overflow-y": "auto",
  },
};

PRESETS['stretchy'] = { 
  'name': '4x4 stretch',
  'itemCount': 16,
  'containerStyles': {
  'flex-direction': 'row',
  'flex-wrap': 'wrap',
  'justify-content': 'center',
  'align-items': 'center',
  'align-content': 'center',
  'overflow-x': 'auto',
  'overflow-y': 'auto',
  'padding': '0px'}
,'commonItemStyles': {
  'width': '25%',
  'min-width': '0px',
  'max-width': 'none',
  'height': '25%',
  'min-height': '0px',
  'max-height': 'none',
  'flex-grow': '1',
  'flex-shrink': '1',
  'flex-basis': 'auto',
  'overflow-x': 'auto',
  'overflow-y': 'auto',
  'align-self': 'auto',
  'margin': '0px'}
}