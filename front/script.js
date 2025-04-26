// Get the form element
const form = document.getElementById("box1form");
const form2 = document.getElementById("box12form");
const form3 = document.getElementById("box3form");
const form4 = document.getElementById("box8form");
const form5 = document.getElementById("box9form");
const form6 = document.getElementById("box10form");

//first form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent actual form submission

  // Get the values of inputs

  const router = document.getElementById("device").value;
  const inter = document.getElementById("interface").value;
  const ipaddress = document.getElementById("ipaddress").value;
  const mask = document.getElementById("mask").value;

  console.log("Name:", router);
  console.log("Email:", inter);
});

//handeling forms
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  const numberInput = document.getElementById("ipaddress");
  const numberInputError = document.getElementById("numberInputError");

  // Clear previous errors
  numberInputError.textContent = "";

  // Validate Number Input
  if (
    !numberInput.value.match(
      /^((25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})$/
    )
  ) {
    numberInputError.textContent = "Please enter only ips.";
  }

  // If no errors, submit the form
  if (!numberInputError.textContent) {
    alert("Form submitted successfully!");
    // Uncomment this line if you want to actually submit the form
    // form.submit();
  }
});

//first form
let interfaces = [];
const addbtn1 = document.querySelector(".boom1");
addbtn1.addEventListener("click", function (e) {
  e.preventDefault();

  const int = document.getElementById("interface").value;
  const ip = document.getElementById("ipaddress").value;
  const mask = document.getElementById("mask").value;

  if (int && ip && mask) {
    interfaces.push({ int, ip, mask });
    alert("Interface added!");
  } else {
    alert("Please fill all interface fields");
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const routerName = document.getElementById("device").value;

  const data = {
    routers: [
      {
        routerName: routerName,
        interfaces: interfaces,
      },
    ],
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/configure-interfaces",
      data, // send the data directly here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Configuration sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send configuration.");
  }
});

//second form
let pcs = [];
const addbtn2 = document.querySelector(".boom2");
addbtn2.addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("pc").value;
  const ip = document.getElementById("ipaddress2").value;
  const mask = document.getElementById("mask2").value;
  const gateway = document.getElementById("Gateway").value;

  if (name && ip && mask && gateway) {
    pcs.push({ name, ip, mask, gateway });
    alert("Interface added!");
    form.reset(); // optional
  } else {
    alert("Please fill all interface fields");
  }
});

form2.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    pcs: [
      {
        name: form2.pc.value,
        ip: form2.ipaddress2.value,
        mask: form2.mask2.value,
        gateway: form2.Gateway.value,
      },
    ],
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/configurePcs",
      data, // send the data directly here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Configuration sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send configuration.");
  }
});

//third form
form3.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    sourcePC: form3.pc.value,
    targetIP: form3.ipaddress.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/ping",
      data, // send the data directly here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Configuration sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send configuration.");
  }
});

//fifth form
let staticRoutes = [];
const addbtn4 = document.querySelector(".boom4");
addbtn4.addEventListener("click", function (e) {
  e.preventDefault();

  const destinationNetwork = document.getElementById("destination").value;
  const mask = document.getElementById("submask").value;
  const nextHop = document.getElementById("nexthop").value;

  if (destinationNetwork && mask && nextHop) {
    staticRoutes.push({ destinationNetwork, mask, nextHop });
    alert("Interface added!");
    form.reset(); // optional
  } else {
    alert("Please fill all interface fields");
  }
});
form5.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    routers: [
      {
        name: form5.device2.value,
        staticRoutes: [
          {
            destinationNetwork: form5.destination.value,
            mask: form5.submask.value,
            nextHop: form5.nexthop.value,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/configure-static",
      data, // send the data directly here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Configuration sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send configuration.");
  }
});

//fourth form
let ospfNetworks = [];
const addbtn3 = document.querySelector(".boom3");
addbtn3.addEventListener("click", function (e) {
  e.preventDefault();

  const area = document.getElementById("area").value;
  const ip = document.getElementById("neighbor").value;
  const wildcard = document.getElementById("inversemask").value;

  if (area && ip && wildcard) {
    ospfNetworks.push({ ip, wildcard, area });
    alert("Interface added!");
    form.reset(); // optional
  } else {
    alert("Please fill all interface fields");
  }
});
form4.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {};

  try {
    const response = await axios.post(
      "http://localhost:3000/configure-ospf",
      data, // send the data directly here
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert("Configuration sent successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send configuration.");
  }
});
