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
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    routers: [
      {
        routersName: form.device.value,
        interfaces: [
          {
            int: form.interface.value,
            ip: form.ipaddress.value,
            mask: form.mask.value,
          },
        ],
      },
    ],
    routersName: form.device.value,
    interfaces: [
      {
        int: form.interface.value,
        ip: form.ipaddress.value,
        mask: form.mask.value,
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
