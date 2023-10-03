let userInfo;


async function initResultPage() {
  // Show user's location on Google Map
  initMap();

  // Display user information
  document.getElementById("ipAddress").innerText = userInfo.ip;
  document.getElementById("location").innerText = `${userInfo.city}, ${userInfo.region}`;
  document.getElementById("timeZone").innerText = userInfo.timezone;

  // Get post offices using pincode
  const pincode = userInfo.postal;
  const postOfficeResponse = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  const postOfficeData = await postOfficeResponse.json();
  const postOffices = postOfficeData[0].PostOffice;

  // Display post offices
  const postOfficesList = document.getElementById("postOffices");
  postOfficesList.innerHTML = "";
  postOffices.forEach(postOffice => {
    const li = document.createElement("li");
    li.textContent = `${postOffice.Name} - ${postOffice.BranchType}`;
    postOfficesList.appendChild(li);
  });
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: parseFloat(userInfo.loc.split(",")[0]), lng: parseFloat(userInfo.loc.split(",")[1]) },
    zoom: 8,
  });
}

function filterPostOffices() {
  const searchBoxValue = document.getElementById("searchBox").value.toLowerCase();
  const postOffices = document.getElementById("postOffices").getElementsByTagName("li");

  for (const postOffice of postOffices) {
    const textContent = postOffice.textContent.toLowerCase();
    if (textContent.includes(searchBoxValue)) {
      postOffice.style.display = "block";
    } else {
      postOffice.style.display = "none";
    }
  }
}

// Call the function on page load
window.onload = async function() {
  // Fetch user information from the local storage
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  if (!userInfo) {
    // Redirect to the main page if user information is not available
    window.location.href = "index.html";
  } else {
    initResultPage();
  }
};
