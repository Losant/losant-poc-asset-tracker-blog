const net = require('net');
const GL505Driver = require('./lib/drivers/gl505');
const Config = require('./config');
var Device = require('losant-mqtt').Device;

var device = new Device({
  id: Config.LOSANT_DEVICE_ID,
  key: Config.LOSANT_KEY,
  secret: Config.LOSANT_SECRET
});

device.connect();

const server = net.createServer((c) => {
  /* eslint-disable no-console */
  // 'connection' listener
  console.log('client connected');
  /* eslint-enable no-console */

  c.on('end', () => {
    /* eslint-disable no-console */
    console.log('client disconnected');
    /* eslint-enable no-console */
  });

  c.on('data', (data) => {
    /* eslint-disable no-console */
    console.log('%s MESSAGE', data);
    /* eslint-enable no-console */
    var state = GL505Driver.handleMessage(data);

    if (state) {
      // Report state to Losant
      /* eslint-disable no-console */
      console.log(state);
      return device.sendState(state.data);
      /* eslint-enable no-console */

    }
  });

  c.write('HELLO\r\n');

  c.pipe(c);
});

server.on('error', (err) => {
  throw err;
});
server.listen(Config.PORT, () => {
  /* eslint-disable no-console */
  console.log('server bound');
  /* eslint-enable no-console */
});
