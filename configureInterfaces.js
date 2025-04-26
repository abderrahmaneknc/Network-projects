const { connectToDevice } = require('./connect');
const { routers } = require('./devices');

async function configureInterfaces(name, interfaces) {
  const router = routers.find(r => r.name === name);
if (!router) {
  throw new Error(`Unknown router: ${name}`);
}
const port = router.port;


  const conn = await connectToDevice(port);
  
  try {
    await conn.exec('configure terminal');
  
    for (const iface of interfaces) {
      await conn.exec(`interface ${iface.int}`);
      await conn.exec(`ip address ${iface.ip} ${iface.mask}`);
      await conn.exec('no shutdown');
      await conn.exec('exit');
    }
  
    await conn.exec('end');
    await conn.exec('write memory');
  } catch (err) {
    console.error(`Error configuring interfaces for router ${name}:`, err);
    throw err; 
  } finally {
    conn.end(); 
  }
}

module.exports = configureInterfaces;
