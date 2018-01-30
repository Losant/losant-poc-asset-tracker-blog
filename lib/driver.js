var Driver = function () {};

Driver.prototype.parseDate = function (str) {
  var year = parseInt(str.substr(0, 4));
  var month = parseInt(str.substr(4, 2)) - 1;
  var day = parseInt(str.substr(6, 2));
  var hour = parseInt(str.substr(8, 2));
  var min = parseInt(str.substr(10, 2));
  var sec = parseInt(str.substr(12, 2));
  return new Date(Date.UTC(year, month, day, hour, min, sec));
};

module.exports = Driver;
