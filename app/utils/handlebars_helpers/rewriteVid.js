module.exports = function(type, url) {
  switch (type) {
    case 'mp4':
      return url.replace('webm', 'mp4').replace('ogg', 'mp4').replace('ogv', 'mp4');
    case 'webm':
      return url.replace('mp4', 'webm').replace('ogg', 'webm').replace('ogv', 'webm');
    case 'ogv':
      return url.replace('mp4', 'ogv').replace('webm', 'ogv').replace('ogv', 'ogv');
    default:
      return url.replace('webm', 'mp4').replace('ogg', 'mp4').replace('ogv', 'mp4');
  }
};
