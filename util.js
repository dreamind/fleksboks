// Dependecies: [cash, lodash]

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

const getStyle = (target, prop) => {
  const { original, computed } = getStyleValues(target, prop);
  if (_.isNil(original) || original === computed) {
    return computed;
  }
  return `${original} (${computed})`;
};

const getStyles = (target, whiteList) => {
  const styles = {};
  _.each(whiteList, (param) => {
    const { prop, values } = param;
    // const def = param.default || values[0];
    let value = getStyleValues(target, prop).final;
    // if (!_.includes(values, value)) {
    //   value = def;
    // }
    styles[prop] = value;
  });
  return styles;
};

const genStyleSet = (selector, whiteList) => {
  const styleSet = {};
  $(selector).each((i, target) => {
    const styles = getStyles(target, whiteList);
    const id = target.id || (target.data && target.data.id) || 'untitled';
    _.each(_.keys(whiteList), prop => {
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
  let str = '';
  _.each(styles, (val, prop) => {
    str += `    ${prop}: ${val};\n`;
  });
  return `${selector} {\n${str}}\n`;
};

// Create key: { prop: val, ... } entry in string
// key must be valid js key, e.g. without '-'
const objectifyStyles = (styles, key) => {
  let kv = [];
  _.each(styles, (val, prop) => {
    kv.push(`    '${prop}': '${val}'`);
  });
  kv = kv.join(',\n')
  return `'${key}': {\n${kv}}\n`;
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
    const block = rule[2]
    const kvs = reEach(/\s*(\S+)\s*\:\s*(\S+)\s*?;/sg, block)
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
    $(selector).css(prop, val);
  })  
}


