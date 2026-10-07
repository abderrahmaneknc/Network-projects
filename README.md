# Network Lab Automation API

REST API that automates Cisco-style router and PC configuration in Packet Tracer (or similar lab topologies) over **Telnet**. Instead of typing CLI commands device by device, you send JSON payloads and the server applies interface, routing, and connectivity settings in batch.

## Highlights

- Configure router interfaces and end-host IP settings from a single HTTP request
- Apply **static routes** and **OSPF** across multiple routers
- Run arbitrary show/exec commands and **ping** between simulated PCs
- Simple web UI in `front/` for triggering common lab workflows
- Device names and Telnet ports centralized in `devices.js`

## Tech stack

- **Node.js**, **Express 5**
- **telnet-client** / **ssh2** for device access
- **CORS** + JSON body parsing

## Prerequisites

- Node.js 18+
- Lab environment with routers/PCs listening on the Telnet ports defined in `devices.js` (default example: R1–R3, PC1–PC3)

## Getting started

```bash
git clone https://github.com/abderrahmaneknc/Network-projects.git
cd Network-projects
npm install
node app.js
```

Server listens on **http://localhost:3000**.

## Project layout

| Path | Role |
|------|------|
| `app.js` | HTTP server and route definitions |
| `configureInterfaces.js` | Router interface configuration |
| `configurePC.js` | PC IP / gateway configuration |
| `staticRouting.js` | Static route installation |
| `configureOspf.js` | OSPF network statements |
| `pingPCs.js` | End-to-end reachability tests |
| `connect.js` | Telnet session helpers |
| `devices.js` | Router/PC names and ports |
| `front/` | Lightweight frontend |

## API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/configure-interfaces` | Set IPs and masks on router interfaces |
| `POST` | `/configurePcs` | Configure PC IP, mask, and default gateway |
| `POST` | `/configure-static` | Install static routes per router |
| `POST` | `/configure-ospf` | Advertise OSPF networks |
| `POST` | `/ping` | Ping from one PC to another by name |
| `POST` | `/run-command` | Execute a CLI command on a named router |

### Example: configure interfaces

```json
POST /configure-interfaces
{
  "routers": [
    {
      "routerName": "R1",
      "interfaces": [
        { "int": "fa0/0", "ip": "13.13.13.1", "mask": "255.255.255.0" }
      ]
    }
  ]
}
```

### Example: ping

```json
POST /ping
{
  "sourcePC": "PC1",
  "targetPC": "PC2"
}
```

Update `devices.js` so router and PC names/ports match your topology before running commands.

## Author

**Kennouche Abderrahmane**

## License

ISC
