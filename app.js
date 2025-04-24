const express = require('express');
const bodyParser = require('body-parser');
const configureRouter = require('./configureRouterOspf');
const configurePC = require('./configurePC');

const app = express();
app.use(bodyParser.json());

app.post('/start-config', async (req, res) => {
  const { routers, pcs } = req.body;

  try {
    // Configure all routers
    for (const router of routers) {
      await configureRouter(router.port, router.interfaces, router.ospfNetworks);
    }

    // Configure all PCs
    for (const pc of pcs) {
      await configurePC(pc.port, pc.ip, pc.mask, pc.gateway);
    }

    res.send('All devices configured successfully.');
  } catch (err) {
    console.error('Error during configuration:', err);
    res.status(500).send('Configuration failed: ' + err.message);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
