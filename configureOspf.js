const { connectToDevice } = require('./connect');
const { routers } = require('./devices');

async function configureOspf(name, ospfNetworks) {
  const router = routers.find(r => r.name === name);  
  if (!router) throw new Error(`Unknown router: ${name}`);

  const conn = await connectToDevice(router.port);  

  try {
    await conn.exec('configure terminal');
    await conn.exec('router ospf 1');

    
    for (const net of ospfNetworks) {
      await conn.exec(`network ${net.ip} ${net.wildcard} area ${net.area}`);
    }

    await conn.exec('end');
    await conn.exec('write memory');
  } catch (err) {
    console.error(`Error configuring OSPF for router ${name}:`, err);
    throw err;
  } finally {
    conn.end(); 
  }
}

module.exports = configureOspf;
