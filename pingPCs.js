const { connectToDevice } = require('./connect');
const { pcs } = require('./devices');

async function pingPC(sourcePCName, targetIP) {
  const source = pcs.find(pc => pc.name === sourcePCName);
  if (!source) throw new Error(`Unknown source PC: ${sourcePCName}`);

  const conn = await connectToDevice(source.port);
  const result = await conn.exec(`ping ${targetIP}`);
  conn.end();

  const commandLine = `${sourcePCName}> ping ${targetIP}`;
  return `${commandLine}\n`;
}

module.exports = pingPC;
