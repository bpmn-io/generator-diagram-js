module.exports.toCamelCase = function toCamelCase(str) {
  return str.replace(/(?:[-_](\w))/g, function(_0, match) {
    return match.toUpperCase();
  });
};

module.exports.toShortName = function toShortName(name) {
  if (name.includes('/')) {
    name = name.substring(name.lastIndexOf('/') + 1);
  }

  return name;
};

module.exports.toServiceName = function toServiceName(str) {
  return str.substring(0, 1).toLowerCase() + str.substring(1);
};

module.exports.toServiceClass = function toServiceClass(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
};
