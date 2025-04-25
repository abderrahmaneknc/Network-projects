# API Documentation - Configure Interfaces

## Endpoint

**URL**: `http://localhost:3000/configure-interfaces`

**Method**: `POST`

This endpoint allows you to configure interfaces for routers using an HTTP POST request. The request should include a payload containing an array of routers, where each router contains its name and a list of interfaces with their respective IP addresses and subnet masks.

---

## Request Body

The request body should be in JSON format and contain the following structure:

- `routers` (array of objects): An array of routers, where each router object contains:
  - `routerName` (string): The name of the router.
  - `interfaces` (array of objects): An array of interfaces for the router, where each interface object contains:
    - `int` (string): The interface name.
    - `ip` (string): The IP address for the interface.
    - `mask` (string): The subnet mask for the interface.

### Example Request Body:

```json
{
  "routers": [
    {
      "routerName": "R1",
      "interfaces": [
        { "int": "fa0/0", "ip": "13.13.13.1", "mask": "255.255.255.0" },
        { "int": "se0/1", "ip": "10.0.0.1", "mask": "255.255.255.252" },
        { "int": "se0/0", "ip": "192.168.5.2", "mask": "255.255.255.252" }
      ]
    },
    {
      "routerName": "R2",
      "interfaces": [
        { "int": "fa0/0", "ip": "11.11.11.1", "mask": "255.255.255.0" },
        { "int": "se0/0", "ip": "172.16.28.1", "mask": "255.255.255.252" },
        { "int": "se0/1", "ip": "10.0.0.2", "mask": "255.255.255.252" }
      ]
    },
    {
      "routerName": "R3",
      "interfaces": [
        { "int": "fa0/0", "ip": "12.12.12.1", "mask": "255.255.255.0" },
        { "int": "se0/0", "ip": "192.168.5.1", "mask": "255.255.255.252" },
        { "int": "se0/1", "ip": "172.16.28.2", "mask": "255.255.255.252" }
      ]
    }
  ]
}



# API Documentation - Configure PCs

## Endpoint

**URL**: `http://localhost:3000/configurePcs`

**Method**: `POST`

This endpoint allows you to configure PCs by sending a POST request to the specified URL. The request should include a JSON payload with an array of PCs, where each PC object contains its name, IP address, subnet mask, and gateway IP address.

---

## Request Body

The request body should be in JSON format and contain the following structure:

- `pcs` (array of objects): An array of PCs, where each PC object contains:
  - `name` (string): The name of the PC.
  - `ip` (string): The IP address of the PC.
  - `mask` (string): The subnet mask for the PC.
  - `gateway` (string): The gateway IP address for the PC.

### Example Request Body:

```json
{
  "pcs": [
    {
      "name": "PC1",
      "ip": "12.12.12.10",
      "mask": "255.255.255.0",
      "gateway": "12.12.12.1"
    },
    {
      "name": "PC2",
      "ip": "13.13.13.10",
      "mask": "255.255.255.0",
      "gateway": "13.13.13.1"
    },
    {
      "name": "PC3",
      "ip": "11.11.11.10",
      "mask": "255.255.255.0",
      "gateway": "11.11.11.1"
    }
  ]
}

