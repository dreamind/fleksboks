// Dependecies: [util.js]

const DEFAULT_NUM_ITEMS = 4;
const ITEM_SIZE = 200;
const CONTAINER_SIZE = 2 * ITEM_SIZE;
const RESIZER_SIZE = 10; // padding-bottom and right of the resize
const CONTAINER_SELECTOR = ".container";
const ITEM_SELECTOR = ".item";
const PROPS_SELECTOR = "#props";
const SELECTED_CLASS = "selected";
const SELECTED_ITEM_SELECTOR = `${ITEM_SELECTOR}.${SELECTED_CLASS}`;
const RESIZER_SELECTOR = ".resizer";
const CONTROLS_SELECTOR = ".controls";
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

const resetStyle = (selector, param) => {
  const { prop, values } = param;
  const def = param.default || values[0];
  update.item(prop, def, selector);
  if (def === -1) {
    $(selector).each((i, e) => {
      e.selectedIndex = -1;
    });
  }
};

const resetStyles = (selector, whiteList) => {
  _.each(whiteList, param => {
    resetStyle(selector, param);
  });
};

const loadStyles = (selector, whiteList, type = "item") => {
  const styleSet = genStyleSet(selector, whiteList);

  if (_.size(styleSet) === 0) {
    // nothing is selected
    return;
  }

  _.each(whiteList, (params, prop) => {
    const options = params.values
    const values = styleSet[prop];
    const control = $("#" + type + "-" + prop);
    if (_.size(values) === 1) {
      let val = _.keys(values)[0]
      if (!_.includes(options, val)) {
        control.append(
          `<option value="${val}">${val}</option>`
        )
      } 
      control.val(val);     
    } else {
      control[0].selectedIndex = -1;
    }
  });
};

const getItemStyles = (selector, whiteList) => {
  const styleSet = genStyleSet(selector, whiteList);
  const commonStyles = {};
  const itemStyles = {};

  _.each(_.keys(whiteList), prop => {
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
  let preset = [objectifyStyles(containerStyles, "containerStyles")];
  let itemPreset;

  if (_.size(commonItemStyles) > 0) {
    preset.push(objectifyStyles(commonItemStyles, "commonItemStyles"));
  }
  if (_.size(itemStyles) > 0) {
    itemPreset = _.map(itemStyles, objectifyStyles).join(",");
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

const applyPreset = preset => {
  const { itemCount, containerStyles, commonItemStyles, itemStyles } = preset;
  
  $(ITEM_SELECTOR).removeClass("selected");
  while (itemCount > numItems) {
    addItem();
  }
  while (itemCount < numItems) {
    removeItem();
  }

  _.each(containerStyles, (val, prop) => {
    update.container(prop, val);
  });
  _.each(commonItemStyles, (val, prop) => {
    update.item(prop, val, ITEM_SELECTOR);
  });
  _.each(itemStyles, (styles, id) => {
    _.each(styles, (val, prop) => {
      update.item(prop, val, "#" + id);
    });
  });
  loadStyles(CONTAINER_SELECTOR, containerParams, "container");
  loadStyles(ITEM_SELECTOR, itemParams, "item");
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

  $(".container").append(item);
  resetStyles(item, itemParams);
};

const removeItem = () => {
  const idx = numItems-- - 1;
  $(`#item-${idx}`).remove();
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
    container.css(prop, val);
  },
  item: (prop, val, selector) => {
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

  $(PROPS_SELECTOR)
    .html(
      _.reduce(
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
              return getStyle(target, p1);
            }).join(", ");
            p = p[0];
          } else {
            v = i ? getStyle(target, p) : item.data("index");
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
    )
    .css("left", left)
    .css("top", top)
    .css("width", width)
    .css("height", height)
    .show();
};

const itemOut = e => {
  // const { target: { id: prop, value } } = e
  $("#props").hide();
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
  loadStyles(SELECTED_ITEM_SELECTOR, itemParams, "item");
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

  controls.append('<div class="heading">Presets</div>');
  buildControl(
    {
      prop: "pick",
      default: 'default',
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
        .append(
          $(`<button>none</select>`).on("click", () => {
            $(ITEM_SELECTOR).removeClass("selected");
          })
        )
        .append(
          $(`<button>all</select>`).on("click", () => {
            $(ITEM_SELECTOR).addClass("selected");
          })
        )
    )
    .append(
      controlWrap("no. items")
        .append($(`<button>-</select>`).on("click", removeItem))
        .append($(`<button>+</select>`).on("click", addItem))
    );

  _.each(itemTree, param => {
    buildControl(param, "item");
  });

  controls.append(
    controlWrap("content")
      .append(
        $(`<button>index</select>`).on("click", () => {
          itemContent("index");
        })
      )
      .append(
        $(`<button>random</select>`).on("click", () => {
          itemContent("random");
        })
      )
  );

  controls.append('<div class="heading"></div>').append(
    controlWrap("Export").append(
      $(`<button>css</select>`).on("click", () => {
        const stylesheet = $(STYLESHEET_SELECTOR);
        const content = $(`${STYLESHEET_SELECTOR} .content`);
        content.empty();
        content.text(serializeStylesAll());
        stylesheet.show();
      })
    )
  );
  resetStyles(CONTAINER_SELECTOR, containerParams)
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
};

const setup = () => {
  buildItems();
  buildControls(PARAMETERS);
  buildAux();
  resetContainer();
  applyPreset('default');
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
