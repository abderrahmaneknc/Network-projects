const connectToDevice = require('./connect');

async function configurePC(port, ip, mask, gateway) {
  const conn = await connectToDevice(port);
  await conn.exec(`ip ${ip} ${mask} ${gateway}`);
  conn.end();
}

module.exports = configurePC;
