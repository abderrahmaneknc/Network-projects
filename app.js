const express = require('express');
const bodyParser = require('body-parser');
const configurePC = require('./configurePC');
const configureOspf = require('./configureOspf');  
const configureInterfaces = require('./configureInterfaces');
const { getCommandOutput } = require('./connect');
const { pcs } = require('./devices');  
const { routers } = require('./devices');  
const pingPC = require('./pingPCs'); 
const configureStaticRouting = require('./staticRouting'); // Import the static routing configuration function
const cors = require('cors'); // Import the CORS middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());




app.post('/configure-interfaces', async (req, res) => {
  console.log('Received data:', req.body);  // Log the received data
  const { routers } = req.body;

  // Check if routers is an array
  if (!Array.isArray(routers)) {
    return res.status(400).send('Invalid request: routers should be an array');
  }

  try {
    for (const router of routers) {
      const { routerName, interfaces } = router;
      await configureInterfaces(routerName, interfaces);  
    }

    res.send(`Interfaces configured successfully for ${routers.map(r => r.routerName).join(', ')}.`);
  } catch (err) {
    console.error('Error configuring interfaces:', err);
    res.status(500).send('Configuration failed: ' + err.message);
  }
});

app.post('/configurePcs', async (req, res) => {
  const { pcs } = req.body;

  try {
    for (const pc of pcs) {
      await configurePC(pc.name, pc.ip, pc.mask, pc.gateway);
    }

    res.send(`PCs configured successfully: ${pcs.map(pc => pc.name).join(', ')}.`);	
  } catch (err) {
    console.error('Error during PC configuration:', err);
    res.status(500).send('PC Configuration failed: ' + err.message);
  }
});

app.post('/configure-static', async (req, res) => {
  const { routers } = req.body; // routers est un tableau [{ name, staticRoutes: [{ destinationNetwork, mask, nextHop }] }]

  try {
    for (const router of routers) {
      const { name, staticRoutes } = router;

      for (const route of staticRoutes) {
        const { destinationNetwork, mask, nextHop } = route;
        await configureStaticRouting(name, destinationNetwork, mask, nextHop);
      }
    }

    res.send(`Static routes configured successfully for  ${routers.map(r => r.name).join(', ')}.`);
  } catch (err) {
    console.error('Error during static route configuration:', err);
    res.status(500).send('Static route configuration failed: ' + err.message);
  }
});

app.post('/configure-ospf', async (req, res) => {
  const { routers } = req.body;  

  try {
    for (const router of routers) {
      const { name, ospfNetworks } = router;  
      await configureOspf(name, ospfNetworks); 
    }

    res.send('OSPF configured successfully for all routers.');
  } catch (err) {
    console.error('Error during OSPF configuration:', err);
    res.status(500).send('OSPF configuration failed: ' + err.message);
  }
});


app.post('/ping', async (req, res) => {
  const { sourcePC, targetIP } = req.body;

  try {
    const output = await pingPC(sourcePC, targetIP);
    res.send(output); 
  } catch (err) {
    console.error('Ping error:', err);
    res.status(500).send('Ping failed: ' + err.message);
  }
});



// Endpoint to run commands on routers
// Endpoint to run commands on routers
app.post('/run-command', async (req, res) => {
  const { routerName, command } = req.body;

  if (!routerName || !command) {
    return res.status(400).send('Both routerName and command are required');
  }

  const router = routers.find(r => r.name === routerName);

  if (!router) {
    return res.status(400).send('Unknown router');
  }

  try {
    // Get the cleaned output
    const output = await getCommandOutput(router.port, command);
    
    // Send only the cleaned output
    res.send(output); 
  } catch (err) {
    console.error('Error running command:', err);
    res.status(500).send('Error retrieving command output: ' + err.message);
  }
});


// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
