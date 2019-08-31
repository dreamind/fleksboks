// Dependecies: [presets/core.js, parameters.js, util.js]

const DEFAULT_NUM_ITEMS = 4;
const ITEM_SIZE = 200;
const CONTAINER_SIZE = 2 * ITEM_SIZE;
const RESIZER_SIZE = 10; // padding-bottom and right of the resize
const CONTAINER_SELECTOR = "#container";
const ITEM_SELECTOR = ".item";
const PROPS_SELECTOR = "#props";
const SELECTED_CLASS = "selected";
const SELECTED_ITEM_SELECTOR = `${ITEM_SELECTOR}.${SELECTED_CLASS}`;
const RESIZER_SELECTOR = "#resizer";
const CONTROLS_SELECTOR = "#controls";
const STYLESHEET_SELECTOR = "#stylesheet";
const CLIP_SELECTOR = "#clip";

let numItems = 0;
let container, stylesheet, controls;
let itemParams, containerParams;

const resetContainer = () => {
  const l = CONTAINER_SIZE + RESIZER_SIZE + "px";

  $(RESIZER_SELECTOR)
    .css("width", l)
    .css("height", l);
};

const resetStyles = (selector, params) => {
  _.each(params, param => {
    const { prop, values } = param;
    const val = param.default || values[0];    
    if (val !== -1) {
      $(selector).css(prop, _.isString(val) ? val : val + 'px');
    }
  });
};

const lastItemStyles = (selector) => {
  const styles = getStylesFromControls(itemParams, type = "item") 
  updateStyles(selector, styles)
};

/**
 * Load styles of selector to the control
 * 
 * @param {*} selector 
 * @param {*} params 
 * @param {*} type 
 */
const putStylesToControls = (selector, params, type = "item") => {
  const styleSet = genStyleSet(selector, params);

  if (_.size(styleSet) === 0) {
    // nothing is selected
    return;
  }

  _.each(params, (param) => {
    const prop = param.prop
    const options = param.values;
    const values = styleSet[prop];
    const control = $("#" + type + "-" + prop);
    if (_.size(values) === 1) {
      const val = _.keys(values)[0];
      if (!_.includes(options, val)) {
        control.append(`<option value="${val}">${val}</option>`);
      }
      control.val(val);
    } else {
      control[0].selectedIndex = -1;
    }
  });
};

/**
 * Extract styles from control
 * 
 * @param {*} selector 
 * @param {*} params Flat params
 * @param {*} type 
 */
const getStylesFromControls = (params, type = "item") => {
  const styles = {}

  _.each(params, ({ prop, values }) => {
    const control = $("#" + type + "-" + prop);
    let val = control.val()
    if (_.isNil(val)) {
      val = values[0];
    }
    styles[prop] = val
  });

  return styles;
};

const getItemStyles = (selector, params) => {
  const styleSet = genStyleSet(selector, params);
  const commonStyles = {};
  const itemStyles = {};

  _.each(_.keys(params), prop => {
    const tally = styleSet[prop];
    const values = _.keys(tally);
    if (_.size(values) === 1) {
      commonStyles[prop] = values[0];
    } else {
      _.each(values, value => {
        const ids = tally[value];
        _.each(ids, id => {
          if (!itemStyles[id]) {
            itemStyles[id] = {};
          }
          itemStyles[id][prop] = value;
        });
      });
    }
  });
  return {
    commonStyles,
    itemStyles,
  };
};

const getStylesAll = () => {
  const { commonStyles: commonItemStyles, itemStyles } = getItemStyles(
    ITEM_SELECTOR,
    itemParams
  );
  const containerStyles = getStyles($(CONTAINER_SELECTOR)[0], containerParams);
  return {
    containerStyles,
    commonItemStyles,
    itemStyles,
  };
};

const serializeStylesAll = () => {
  const { containerStyles, commonItemStyles, itemStyles } = getStylesAll();
  return [
    serializeStyles(containerStyles, CONTAINER_SELECTOR),
    serializeStyles(commonItemStyles, ITEM_SELECTOR),
    _.reduce(
      itemStyles,
      (str, styles, id) => {
        return str + serializeStyles(styles, "#" + id) + "\n";
      },
      ""
    ),
  ].join("\n");
};

const exportPreset = (code, name) => {
  const { containerStyles, commonItemStyles, itemStyles } = getStylesAll();
  let preset = [stringifyStyles(containerStyles, "containerStyles")];
  let itemPreset;

  if (_.size(commonItemStyles) > 0) {
    preset.push(stringifyStyles(commonItemStyles, "commonItemStyles"));
  }
  if (_.size(itemStyles) > 0) {
    itemPreset = _.map(itemStyles, stringifyStyles).join(",");
    preset.push(`
      itemStyles: {
        ${itemPreset}
      }`);
  }
  preset = preset.join(",");
  return `
  PRESETS['${code}'] = { 
    'name': '${name}',
    'itemCount': ${numItems},
    ${preset}
  }`;
};

const updateStylesWithParams = (selector, styles, params) => {
  _.each(params, param => {
    const { prop, values } = param
    let val
    if (prop in styles) {
      val = styles[prop]
    } else {
      val = param.default || values[0]
    }
    $(selector).css(prop, val);    
  })  
}

const applyPreset = preset => {
  const { itemCount, containerStyles, commonItemStyles, itemStyles } = preset;

  selectNoItem(true);
  while (itemCount > numItems) {
    addItem();
  }
  while (itemCount < numItems) {
    removeItem();
  }
  updateStylesWithParams(CONTAINER_SELECTOR, containerStyles, containerParams)
  updateStyles(ITEM_SELECTOR, commonItemStyles)
  _.each(itemStyles, (styles, id) => {
    updateStyles("#" + id, styles)
  });
  putStylesToControls(CONTAINER_SELECTOR, containerParams, "container");
  putStylesToControls(ITEM_SELECTOR, itemParams, "item");
};

const applyStyles = () => {
  selectNoItem(true);
  const stylesheet = parseStyles($(`${STYLESHEET_SELECTOR} .content`).text());
  _.each(stylesheet, ({ selector, styles }) => {
    updateStyles(selector, styles);
  });
  putStylesToControls(CONTAINER_SELECTOR, containerParams, "container");
  putStylesToControls(ITEM_SELECTOR, itemParams, "item");
};

/**
 * Adding/removing item
 */

const addItem = () => {
  const idx = numItems++;
  const item = $(
    `<div id="item-${idx}" data-index="${idx}" class="item">${idx}</div>`
  )
    .on("mouseover", itemOver)
    .on("mouseout", itemOut)
    .on("click", itemClick);

  $(CONTAINER_SELECTOR).append(item);
  lastItemStyles(item)
};

const removeItem = () => {
  const idx = numItems-- - 1;
  $(`#item-${idx}`).remove();
};

const selectNoItem = preventLoad => {
  $(ITEM_SELECTOR).removeClass("selected");
  if (!preventLoad) {
    putStylesToControls(ITEM_SELECTOR, itemParams, "item");
  }
};

const selectAllItems = () => {
  $(ITEM_SELECTOR).addClass("selected");
  putStylesToControls(SELECTED_ITEM_SELECTOR, itemParams, "item");
};

const buildItems = (num = DEFAULT_NUM_ITEMS) => {
  $(ITEM_SELECTOR).remove();
  for (let i = 1; i <= num; i++) {
    addItem();
  }
};

/**
 * Event handling
 */

const update = {
  container: (prop, val) => {
    container.css(prop, _.isString(val) ? val : val + 'px');
  },
  item: (prop, val, selector) => {
    val = _.isString(val) ? val : val + 'px'
    if (selector) {
      $(selector).css(prop, val);
    } else if ($(SELECTED_ITEM_SELECTOR).length) {
      $(SELECTED_ITEM_SELECTOR).css(prop, val);
    } else {
      $(ITEM_SELECTOR).css(prop, val);
    }
  },
};

const change = {
  container: e => {
    const {
      target: {
        dataset: { prop },
        value,
      },
    } = e;
    update.container(prop, value);
  },
  item: e => {
    const {
      target: {
        dataset: { prop },
        value,
      },
    } = e;
    update.item(prop, value);
  },
  preset: e => {
    const {
      target: {
        dataset: { prop },
        value,
      },
    } = e;
    applyPreset(PRESETS[value]);
  },
};

const itemContent = kind => {
  const items = $(ITEM_SELECTOR);
  if (kind === "index") {
    items.each((i, item) => {
      item = $(item);
      item.html(item.data("index"));
    });
  } else {
    items.each((i, item) => {
      item = $(item);
      item.html(
        _.reduce(
          _.range(0, _.random(1, DUMMY.length)),
          (p, s) => p + " " + DUMMY[s],
          ""
        )
      );
    });
  }
};

const itemOver = e => {
  const { target } = e;
  const view = target.getBoundingClientRect();
  const top = view.top;
  const left = view.left;
  const item = $(target);
  const width = item.css("width");
  const height = item.css("height");
  const html = _.reduce(
    [
      "item",
      ["width", "min-width", "max-width"],
      ["height", "min-height", "max-height"],
      "flex",
      "overflow",
    ],
    (t, p, i) => {
      let v;
      if (_.isArray(p)) {
        v = _.map(p, p1 => {
          return getStyleForDisplay(target, p1);
        }).join(", ");
        p = p[0];
      } else {
        v = i ? getStyleForDisplay(target, p) : item.data("index");
      }
      return (
        t +
        `<div>
        <span class="prop">${p}</span><span class="val">${v}</span>
        </div>`
      );
    },
    ""
  )

  $(PROPS_SELECTOR)
    .html(html)
    .css("left", left)
    .css("top", top)
    .css("width", width)
    .css("height", height)
    .show();
};

const itemOut = e => {
  // const { target: { id: prop, value } } = e
  $(PROPS_SELECTOR).hide();
};

const itemClick = e => {
  const { target } = e;
  const selected = $(target).hasClass(SELECTED_CLASS);
  if (!e.shiftKey) {
    $(SELECTED_ITEM_SELECTOR).removeClass(SELECTED_CLASS);
    if (!selected) {
      $(target).addClass(SELECTED_CLASS);
    }
  } else {
    $(target).toggleClass(SELECTED_CLASS);
  }
  putStylesToControls(SELECTED_ITEM_SELECTOR, itemParams, "item");
};

const buildControl = (param, type) => {
  const buildSelect = param => {
    const { prop, values } = param;
    const options = _.reduce(
      values,
      (opts, v, k) => {
        let opt, val;
        if (_.isString(k)) {
          // object, for PRESETS
          opt = v.name;
          val = k;
        } else {
          opt = val = v;
        }
        return opts + `<option value="${val}">${opt}</option>`;
      },
      ""
    );
    const select = $(
      `<select id="${type}-${prop}" data-prop="${prop}">${options}</select>`
    ).on("change", change[type]);
    return select;
  };

  const { prop, subs } = param;
  const control = $(
    `<div class="control">
      <span class="label">${prop}</span>
    </div>`
  );

  if (subs) {
    _.each(subs, sub => {
      control.append(buildSelect(sub));
    });
  } else {
    control.append(buildSelect(param));
  }
  controls.append(control);
};

const buildControls = parameters => {
  const { container: containerTree, item: itemTree } = parameters;

  function controlWrap(label) {
    return $(
      `<div class="control">
        <span class="label">${label}</span>
      </div>`
    );
  }

  function button(label) {
    return $(`<button>${label}</button>`)
  }

  controls.append('<div class="heading">Presets</div>');
  buildControl(
    {
      prop: "pick",
      default: "default",
      values: PRESETS,
    },
    "preset"
  );

  controls.append('<div class="heading">Container</div>');
  _.each(containerTree, param => {
    buildControl(param, "container");
  });
  controls.append(
    controlWrap("container size").append(
      $(`<button>reset</select>`).on("click", resetContainer)
    )
  );

  controls
    .append('<div class="heading">Items</div>')
    .append(
      controlWrap("select")
        .append(button('none').on("click", selectNoItem))
        .append(button('all').on("click", selectAllItems))
    )
    .append(
      controlWrap("no. items")
        .append(button('-').on("click", removeItem))
        .append(button('+').on("click", addItem))
    );
  _.each(itemTree, param => {
    buildControl(param, "item");
  });
  controls.append(
    controlWrap("content")
      .append(
        button('index').on("click", () => {
          itemContent("index");
        })
      )
      .append(
        button('random').on("click", () => {
          itemContent("random");
        })
      )
  );

  controls.append('<div class="heading"></div>').append(
    controlWrap("View").append(
      button('CSS').on("click", () => {
        const stylesheet = $(STYLESHEET_SELECTOR);
        const content = $(`${STYLESHEET_SELECTOR} .content`);
        content.empty();
        content.text(serializeStylesAll());
        stylesheet.show();
      })
    )
  );
  resetStyles(CONTAINER_SELECTOR, containerParams);
  resetStyles(ITEM_SELECTOR, itemParams);
};

const buildAux = () => {
  const stylesheet = $(STYLESHEET_SELECTOR);
  $(`${STYLESHEET_SELECTOR} .close`).on("click", () => {
    stylesheet.hide();
  });
  $(`${STYLESHEET_SELECTOR} .copy`).on("click", () => {
    copy(`${STYLESHEET_SELECTOR} .content`, CLIP_SELECTOR);
  });
  $(`${STYLESHEET_SELECTOR} .apply`).on("click", () => {
    applyStyles();
  });
};

const setup = () => {
  buildItems();
  buildControls(PARAMETERS);
  buildAux();
  resetContainer();
  $(PROPS_SELECTOR).hide();
  applyPreset(PRESETS["default"]);
};

$(function() {
  // depend on global PARAMETERS
  containerParams = flattenParams(PARAMETERS.container);
  itemParams = flattenParams(PARAMETERS.item);
  container = $(CONTAINER_SELECTOR);
  controls = $(CONTROLS_SELECTOR);
  stylesheet = $(STYLESHEET_SELECTOR);
  setup();
});
