const { connectToDevice } = require('./connect');

const { pcs } = require('./devices'); 

async function configurePC(name, ip, mask, gateway) {
  const pc = pcs.find(pc => pc.name === name);  
  if (!pc) {
    throw new Error(`Unknown PC: ${name}`);
  }

  const conn = await connectToDevice(pc.port);  
  await conn.exec(`ip ${ip} ${mask} ${gateway}`);
  await conn.exec(`save`);
  conn.end();  
}

module.exports = configurePC;
