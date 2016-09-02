module.exports = function(string) {
  return string.replace(/<(?:.|\n)*?>/gm, '').replace('&amp;', 'and');
};
