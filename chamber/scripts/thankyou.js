const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName") || params.get("firstname");
const lastName = params.get("lastName") || params.get("lastname");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("business") || params.get("organization");
const timestamp = params.get("timestamp");

document.getElementById("results").innerHTML = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mobile Phone:</strong> ${phone}</p>
    <p><strong>Business Name:</strong> ${organization}</p>
    <p><strong>Application Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
`;

document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;