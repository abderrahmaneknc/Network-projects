const {Telnet} = require('telnet-client');

async function connectToDevice(port) {
  const connection = new Telnet();

  const params = {
    host: '127.0.0.1',
    port: port,
    shellPrompt: '#',
    timeout: 8000,
    execTimeout: 8000,
    debug: true,
    negotiationMandatory: false,
    ors: '\r\n',
    irs: '\r\n',
  };

  await connection.connect(params);
  return connection;
}

module.exports = connectToDevice;
