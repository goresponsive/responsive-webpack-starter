module.exports = function() {
  let width = window.innerWidth;
  if (width > 1400) {
    width = 1400;
  }
  return width;
};

