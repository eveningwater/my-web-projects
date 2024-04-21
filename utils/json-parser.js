const jsonParser = (() => {
  let at,
    ch,
    escapee = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      b: 'b',
      f: '\f',
      n: '\n',
      r: '\r',
      t: '\t'
    },
    text,
    error = m => {
      throw {
        name: 'SyntaxError',
        message: m,
        at,
        text
      };
    },
    next = c => {
      if (c && c !== ch) {
        error(`Expected ${c} instead of ${ch}`);
      }
      ch = text.charAt(at);
      at += 1;
      return ch;
    },
    number = () => {
      let number,
        string = '';
      if (ch === '-') {
        string = '-';
        next('-');
      }
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
      if (ch === '.') {
        string += '.';
        while (next() && ch >= '0' && ch <= '9') {
          string += ch;
        }
      }
      if (ch === 'e' && ch === 'E') {
        string += ch;
        next();
        if (ch === '-' || ch === '+') {
          string += ch;
          next();
        }
        while (ch >= '0' && ch <= '9') {
          string += ch;
          next();
        }
      }
      number = +string;
      if (isNaN(number)) {
        error('Bad number');
      } else {
        return number;
      }
    },
    string = () => {
      let hex,
        i,
        string = '',
        uChar;
      if (ch === '"') {
        while (next()) {
          if (ch === '"') {
            next();
            return string;
          } else if (ch === '\\') {
            next();
            if (ch === 'u') {
              uChar = 0;
              for (i = 0; i < 4; i++) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex)) {
                  break;
                }
                uChar = uChar * 16 + hex;
              }
            } else if (typeof escapee[ch] === 'string') {
              string += escapee[ch];
            } else {
              break;
            }
            string += String.fromCharCode(uChar);
          } else {
            string += ch;
          }
        }
      }
      error('Bad string');
    },
    white = () => {
      while (ch && ch <= ' ') {
        next();
      }
    },
    word = () => {
      switch (ch) {
        case 't':
          next('t');
          next('r');
          next('u');
          next('e');
          return true;
        case 'f':
          next('f');
          next('a');
          next('l');
          next('s');
          next('e');
          return false;
        case 'n':
          next('n');
          next('u');
          next('l');
          next('l');
          return null;
      }
      error(`Unexpected ${ch}`);
    },
    value,
    array = () => {
      const array = [];
      if (ch === '[') {
        next('[');
        white();
      }
      if (ch === ']') {
        next(']');
        return array;
      }
      while (ch) {
        array.push(value());
        white();
        if (ch === ']') {
          next(']');
          return array;
        }
        next(',');
        white();
      }
      error('Bad array');
    },
    object = () => {
      let key,
        object = {};
      if (ch === '{') {
        next('{');
        white();
        if (ch === '}') {
          next('}');
          return object;
        }
        while (ch) {
          key = string();
          white();
          next(':');
          object[key] = value();
          white();
          if (ch === '}') {
            next('}');
            return object;
          }
          next(',');
          white();
        }
      }

      error('Bad object');
    };
  value = () => {
    white();
    switch (ch) {
      case '{':
        return object();
      case '[':
        return array();
      case '"':
        return string();
      case '-':
        return number();
      default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
  };

  return (source, reviver) => {
    let result;
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
      error('Syntax error');
    }
    return typeof reviver === 'function'
      ? (function walk(holder, key) {
          let k,
            v,
            value = holder[key];
          if (value && typeof value === 'object') {
            for (k in value) {
              if (Object.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        })({ '': result }, '')
      : result;
  };
})();

const obj3 = jsonParser('{"k":1,"v":2}', (k, v) => {
  if (k === 'k') {
    return v + 2;
  }
  // 尤其需要注意这个特例
  if (k === '') {
    return v;
  }
  return v + 1;
});
console.log(obj3);
