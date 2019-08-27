// Dependecies: [cash, lodash]
// { prop1: val1; prop2: val2; } => a CSS declaration
// selector { prop1: val1; prop2: val2; } => a CSS rule (styles)

function copy(selector, clipSelector) {
  const text = $(selector).text();
  const clip = $(clipSelector)[0];
  clip.textContent = text;
  document.body.append(clip);
  clip.select();
  document.execCommand('copy');
}

// flatten two-level sequence
const flattenParams = (params, childrenKey='subs') => {
  const flat = {};

  _.each(params, (param) => {
    const subs = param[childrenKey];
    if (subs) {
      _.each(subs, (param) => {
        flat[param.prop] = param;
      });
    } else {
      flat[param.prop] = param;
    }
  });
  return flat;
};

const getStyleValues = (target, prop) => {
  const original = target.style[prop];
  const item = $(target);
  const computed = item.css(prop);
  const final = _.isNil(original) ? computed : original;
  return { original, computed, final };
};

const getStyleForDisplay = (target, prop) => {
  const { original, computed } = getStyleValues(target, prop);
  if (_.isNil(original) || original === computed) {
    return computed;
  }
  return `${original} (${computed})`;
};

const getStyles = (target, params) => {
  const styles = {};
  _.each(params, (param) => {
    const { prop } = param;
    const value = getStyleValues(target, prop).final;
    styles[prop] = value;
  });
  return styles;
};

const genStyleSet = (selector, params) => {
  const styleSet = {};
  $(selector).each((i, target) => {
    const styles = getStyles(target, params);
    const id = target.id;
    if (!id) { return; }
    _.each(params, ({ prop }) => {
      if (!styleSet[prop]) {
        styleSet[prop] = {};
      }
      const val = styles[prop];
      if (!styleSet[prop][val]) {
        styleSet[prop][val] = [];
      }
      styleSet[prop][val].push(id);
    });
  });
  return styleSet;
};

const serializeStyles = (styles, selector) => {
  let decl = '';
  _.each(styles, (val, prop) => {
    decl += `    ${prop}: ${val};\n`;
  });
  return `${selector} {\n${decl}}\n`;
};

// Create key: { prop: val, ... } entry in string
const stringifyStyles = (styles, key) => {
  let kvs = [];
  _.each(styles, (val, prop) => {
    kvs.push(`    '${prop}': '${val}'`);
  });
  kvs = kvs.join(',\n')
  return `'${key}': {\n${kvs}}\n`;
};

const reEach = (regex, str) => {
  const result = []
  while (match = regex.exec(str)) {
    result.push(match)
  }
  return result
}

const parseStyles = (str) => {
  const stylesheet = []
  const rules = reEach(/(\S+)\s*\{(.*?)\}/sg, str)
  _.each(rules, (rule) => {
    const selector = rule[1]
    const decl = rule[2]
    const kvs = reEach(/\s*(\S+)\s*\:\s*(\S+)\s*?;/sg, decl)
    const styles = _.reduce(kvs, (all, {1: prop, 2: val}) => { all[prop] = val; return all }, {})
    stylesheet.push({
      selector,
      styles
    })
  })
  return stylesheet
}

const updateStyles = (selector, styles) => {
  _.each(styles, (val, prop) => {
    $(selector).css(prop, _.isString(val) ? val : val + 'px');
  })  
}
