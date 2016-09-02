module.exports = function(url, options) {
  return url.indexOf('youtube') !== -1 ? options.fn(this) : options.inverse(this);
};
