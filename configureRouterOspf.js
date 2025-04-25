// const connectToDevice = require('./connect');
// const { routers } = require('./devices');

// async function configureRouterByName(name, interfaces, ospfNetworks) {
//   const port = routers[name];
//   if (!port) {
//     throw new Error(`Unknown router: ${name}`);
//   }

//   const conn = await connectToDevice(port);
//   await conn.exec('enable');
//   await conn.exec('configure terminal');

//   for (const iface of interfaces) {
//     await conn.exec(`interface ${iface.int}`);
//     await conn.exec(`ip address ${iface.ip} ${iface.mask}`);
//     await conn.exec('no shutdown');
//     await conn.exec('exit');
//   }

//   await conn.exec('router ospf 1');
//   for (const net of ospfNetworks) {
//     await conn.exec(`network ${net.ip} ${net.wildcard} area ${net.area}`);
//   }

//   await conn.exec('end');
//   await conn.exec('write memory');
//   conn.end();
// }

// module.exports = configureRouterByName;
