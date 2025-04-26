const { connectToDevice } = require('./connect');
const { routers } = require('./devices');

/**
 * Configure une route statique sur un routeur donné
 * @param {string} name - Le nom du routeur (ex: "R1")
 * @param {string} destinationNetwork - Réseau de destination (ex: "13.13.13.0")
 * @param {string} mask - Masque de sous-réseau (ex: "255.255.255.0")
 * @param {string} nextHop - Adresse IP du next-hop (ex: "10.0.0.2")
 */
async function configureStaticRouting(name, destinationNetwork, mask, nextHop) {
  const router = routers.find(r => r.name === name);
  if (!router) throw new Error(`Unknown router: ${name}`);

  const conn = await connectToDevice(router.port);

  try {
    await conn.exec('configure terminal');
    await conn.exec(`ip route ${destinationNetwork} ${mask} ${nextHop}`);
    await conn.exec('end');
    await conn.exec('write memory');
    console.log(`Static route configured successfully on ${name}`);
  } catch (err) {
    console.error(`Error configuring static routing for router ${name}:`, err);
    throw err;
  } finally {
    conn.end();
  }
}

module.exports = configureStaticRouting;
