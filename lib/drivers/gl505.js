var util = require('util');
var Driver = require('../driver');

var REPORT_RESP = [
  '+RESP:GTCTN', '+RESP:GTGEO', '+RESP:GTRTL',
  '+RESP:GTSTR', '+RESP:GTNMR'
];

var Gl505Driver = function () {};

util.inherits(Gl505Driver, Driver);

Gl505Driver.prototype.handleMessage = function (data) {
  var res = data.toString('UTF-8').split(',');

  if (REPORT_RESP.indexOf(res[0]) === -1) {
    return false;
  }

  var state = {
    time: this.parseDate(res[15]),
    data: {
      messageType: res[0],
      uniqueId: res[2],
      deviceName: res[3],
      reportId: res[4],
      reportType: res[5],
      movementStatus: res[6],
      temp: parseFloat(res[7]),
      batteryPercentage: parseFloat(res[8]),
      gpsAccuracy: parseFloat(res[9]),
      speed: parseFloat(res[10]) || undefined,
      azimuth: parseFloat(res[11]) || undefined,
      altitude: parseFloat(res[12]) || undefined,
      gpsLocation: res[14] + ',' + res[13],
      mcc: res[16],
      mnc: res[17],
      lac: res[18],
      cellId: res[19]
    }
  };

  return state;
};

module.exports = new Gl505Driver();
