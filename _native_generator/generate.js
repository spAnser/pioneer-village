const fs = require('fs');
const { camelCase, pascalCase } = require('change-case');

const json = fs.readFileSync('rdr3natives.json');
const pathToRDR3Shared = '../resources/[system]/rdr3-shared/';

const rdr3natives = JSON.parse(json);

const NATIVE_VAR_STRING = {
  name: 'VAR_STRING',
  comment:
    "Note: The first bit in 'flags' must not be set.\nIt is also required to pass at least one extra argument (this must be a text label string or hash).\nWhen passing a hash, flags should be 0.",
  params: [
    {
      type: 'int',
      name: 'flags',
    },
    {
      type: 'const char*',
      name: 'stringType',
    },
    {
      type: 'string',
      name: 'value',
    },
  ],
  return_type: 'const char*',
  build: '1207',
  variadic: true,
};

const AllowPointerAsArg = ['Any*', 'const char*'];

const typeMap = {
  Any: 'any',
  'Any*': 'DataView',
  char: 'string',
  'const char': 'string | number',
  'const char*': 'string | number',
  int: 'number',
  float: 'number',
  BOOL: 'boolean',
  Object: 'number',
  'Object*': 'number',
};

const jsDocTypeMap = {
  Any: 'any',
  'Any*': 'DataView',
  'const char': 'string',
  'const char*': 'string',
  int: 'number',
  float: 'number',
  BOOL: 'number',
  Blip: 'number',
  Cam: 'number',
  Entity: 'number',
  Hash: 'number',
  Interior: 'number',
  ItemSet: 'number',
  Object: 'number',
  Ped: 'number',
  Pickup: 'number',
  Player: 'number',
  ScrHandle: 'number',
  Vehicle: 'number',
  AnimScene: 'number',
  PersChar: 'number',
  PopZone: 'number',
  Prompt: 'number',
  PropSet: 'number',
  Volume: 'number',
};

const customNameMap = {
  _0x9B90842304C938A7: '_GET_SHOP_ITEM_CATEGORY_AT_INDEX',
};

const filterParamPointers = (param) => !param.type.includes('*') || AllowPointerAsArg.includes(param.type);
const keepParamPointers = (param) => param.type.includes('*') && !AllowPointerAsArg.includes(param.type);

const renameParamMap = {
  var: 'value',
};

const renameParam = (param) => {
  if (param.name in renameParamMap) {
    param.name = renameParamMap[param.name];
  }
  return param;
};

// char*
// const char*

const wrapParam = (param, type) => {
  if (param === '...') {
    return 'args';
  }

  param = camelCase(param);

  switch (type) {
    case 'Hash':
      return `_ch(${param})`;
    case 'float':
      return `_fv(${param})`;
    case 'const char':
    case 'const char*':
      return `_ts(${param})`;
    case 'Vector3*':
      return '_v';
    case 'float*':
      return '_f';
    case 'int*':
    case 'Blip*':
    case 'Cam*':
    case 'Entity*':
    case 'FireId*':
    case 'Hash*':
    case 'Interior*':
    case 'ItemSet*':
    case 'Object*':
    case 'Ped*':
    case 'Pickup*':
    case 'Player*':
    case 'ScrHandle*':
    case 'Vehicle*':
    case 'AnimScene*':
    case 'PersChar*':
    case 'PopZone*':
    case 'Prompt*':
    case 'PropSet*':
    case 'Volume*':
      return '_i';
    case 'BOOL*':
      return '/* actually bool */ _i';
  }

  return param;
};

const mapType = (type) => {
  if (typeMap[type]) {
    return typeMap[type];
  }

  return type;
};

const getReturnParams = (native) => {
  let extra = '';
  switch (native.return_type) {
    case 'int':
    case 'Blip':
    case 'Cam':
    case 'Entity':
    case 'FireId':
    case 'Hash':
    case 'Interior':
    case 'ItemSet':
    case 'Object':
    case 'Ped':
    case 'Pickup':
    case 'Player':
    case 'ScrHandle':
    case 'Vehicle':
    case 'AnimScene':
    case 'PersChar':
    case 'PopZone':
    case 'Prompt':
    case 'PropSet':
    case 'Volume':
      extra = ', _ri';
      break;
    case 'float':
      extra = ', _rf';
      break;
    case 'Vector3':
      extra = ', _rv';
      break;
    case 'const char*':
      extra = ', _s';
      break;
  }

  if (native.name === 'VAR_STRING') {
    extra = ', _rl';
  }

  return ', _r' + extra;
};

const getReturnType = (native) => {
  const paramsWithPointers = native.params.filter(keepParamPointers);
  if (paramsWithPointers.length > 0) {
    const originalReturnType = mapType(native.return_type.replace('*', ''));

    const returnTypes = [];

    if (originalReturnType !== 'void') {
      returnTypes.push(originalReturnType);
    }

    returnTypes.push(...paramsWithPointers.map((param) => mapType(param.type.replace('*', ''))));

    if (returnTypes.length === 1) return returnTypes[0];

    return `[${returnTypes.join(', ')}]`;
  }

  return mapType(native.return_type.replace('*', ''));
};

const typeDefParams = (param) => {
  if (keepParamPointers(param)) return;

  let paramName = param.name;

  switch (paramName) {
    case '...':
      return '...args: any[]';
  }

  if (paramName === 'var') {
    paramName = 'val';
  }

  return `${paramName}: ${mapType(param.type)}`;
};

const jsDocMap = (type) => {
  if (type in jsDocTypeMap) {
    return jsDocTypeMap[type];
  }

  return type;
};

const jsDocParams = (native) => {
  return native.params
    .filter(filterParamPointers)
    .map((param) => {
      let type = mapType(param.type);

      if (param.name === '...') {
        return ' * @param {any[]} args';
      }

      return ` * @param {${jsDocMap(type)}} ${camelCase(param.name)}`;
    })
    .join('\n');
};

const jsFuncs = [];

for (const namespace of Object.keys(rdr3natives)) {
  const keys = Object.keys(rdr3natives[namespace]);

  const tsDefs = [];

  for (const key of keys) {
    try {
      const nativeHash = key.replace('0x', '').toLowerCase();
      const hex2 = nativeHash.slice(-8);
      const hex1 = nativeHash.replace(hex2, '');

      const hexes = `0x${hex1}, 0x${hex2 || 0}`;

      let native = rdr3natives[namespace][key];
      if (native.name === 'VAR_STRING') {
        native = NATIVE_VAR_STRING;
      }

      let name = native.name;

      if (name in customNameMap) {
        name = customNameMap[name];
      }

      name = pascalCase(name);

      if (name.match(/^[0-9]/)) {
        name = `N_${name}`.toUpperCase().replace('0X', '0x');
      }

      const params = native.params.map(renameParam).map((param) => {
        return `${wrapParam(param.name, param.type)}`;
      });
      const paramsArgs = native.params
        .filter(filterParamPointers)
        .map(renameParam)
        .map((param) => {
          if (param.name === '...') {
            return '...args';
          }

          return camelCase(param.name);
        })
        .join(', ');

      const paramsCall = params.join(', ');

      const returnType = getReturnType(native).replace(/Hash/g, 'number');

      let jsFunc = `global.${name} = function (${paramsArgs}) {
  return _in(${hexes}${paramsCall ? `, ${paramsCall}` : ''}${
        native.return_type === 'void' ? '' : getReturnParams(native)
      });
};`;

      let comment = '';
      if (native.comment) {
        comment = native.comment
          .replace(/\t/g, '  ')
          .replace(/\/\*/g, '|*')
          .replace(/\*\//g, '*|')
          .split('\n')
          .map((line) => ` * ${line}`)
          .join('\n');
      }

      const jsDoc = `/**
 * ${native.name}${comment ? '\n' + comment : ''}
 *
${jsDocParams(native)}
 * @return {${jsDocMap(returnType)}}
 */`;

      jsFunc = `${jsDoc}\n${jsFunc}`;

      const tsDef = `${jsDoc}\ndeclare function ${name}(${native.params
        .map(typeDefParams)
        .filter(Boolean)
        .join(', ')}): ${returnType};`;

      jsFuncs.push(jsFunc);

      tsDefs.push(tsDef);
    } catch (e) {
      console.log(e);
      console.log(key, rdr3natives[namespace][key]);
      process.exit();
    }
  }

  fs.writeFileSync(`${pathToRDR3Shared}/types/natives/${namespace}.d.ts`, tsDefs.join('\n\n'));
}

fs.writeFileSync(`${pathToRDR3Shared}/client/rdr3_natives.js`, jsFuncs.join('\n\n'));
