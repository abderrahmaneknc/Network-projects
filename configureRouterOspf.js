const connectToDevice = require('./connect');

async function configureRouter(port, interfaces, ospfNetworks) {
  const conn = await connectToDevice(port);
  await conn.exec('enable');
  await conn.exec('configure terminal');

  for (const iface of interfaces) {
    await conn.exec(`interface ${iface.int}`);
    await conn.exec(`ip address ${iface.ip} ${iface.mask}`);
    await conn.exec('no shutdown');
    await conn.exec('exit');
  }

  await conn.exec('router ospf 1');
  for (const net of ospfNetworks) {
    await conn.exec(`network ${net.ip} ${net.wildcard} area ${net.area}`);
  }

  await conn.exec('end');
  await conn.exec('write memory');
  conn.end();
}

module.exports = configureRouter;
