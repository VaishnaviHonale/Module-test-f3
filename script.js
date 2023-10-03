
// // Declare a variable to store post office data
// let postOfficesData;

// // Event listener for the "Get Started" button
// document.getElementById('btn').addEventListener('click', function() {
//     window.open('result.html', '_blank');
// });

// // Function to get the user's IP address
// function getUserIP() {
//     fetch('https://api64.ipify.org?format=json')
//         .then(response => response.json())
//         .then(data => {
//             const userIP = data.ip;
//             document.getElementById('ipAddress').textContent = userIP;
//             // After getting the IP, proceed to get other user information
//             getUserInfo(userIP);
//         })
//         .catch(error => console.error('Error fetching IP:', error));
// }

// // Function to get user information based on IP
// function getUserInfo(userIP) {
//     fetch(`https://ipapi.co/${userIP}/json/`)
//         .then(response => response.json())
//         .then(userData => {
//             const lat = userData.latitude;
//             const lon = userData.longitude;
//             showMap(lat, lon);

//             const timezone = userData.timezone;
//             showTimeByTimeZone(timezone);

//             const pincode = userData.postal;
//             getPostOffices(pincode);
//         })
//         .catch(error => console.error('Error fetching user info:', error));
// }

// // Function to display the map using latitude and longitude
// function showMap(lat, lon) {
//     const mapDiv = document.getElementById('map');
//     mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
// }

// // Function to display time based on timezone
// function showTimeByTimeZone(timezone) {
//     const timeElement = document.getElementById('timeZone');
//     const userTime = new Date().toLocaleString('en-US', { timeZone: timezone });
//     timeElement.textContent = `Time Zone: ${timezone}, Current Time: ${userTime}`;
// }

// // Function to get a list of post offices based on pincode
// function getPostOffices(pincode) {
//     fetch(`https://api.postalpincode.in/pincode/${pincode}`)
//         .then(response => response.json())
//         .then(postalData => {
//             postOfficesData = postalData[0].PostOffice;
//             displayPostOffices(postOfficesData);
//         })
//         .catch(error => console.error('Error fetching post offices:', error));
// }

// // Function to display the list of post offices
// function displayPostOffices(postOffices) {
//     const postOfficesElement = document.getElementById('postOffices');
//     postOfficesElement.innerHTML = postOffices.map(office => `<li>${office.Name}, ${office.District}</li>`).join('');
// }

// // Function to filter post offices based on search input
// function filterPostOffices() {
//     const searchBoxValue = document.getElementById('searchBox').value.toLowerCase();
//     const filteredOffices = postOfficesData.filter(office => office.Name.toLowerCase().includes(searchBoxValue));
//     displayPostOffices(filteredOffices);
// }

// // Call the function to get the user's IP when the page loads
// getUserIP();










let postOfficesData; // Declare a variable to store post office data

// Function to get user's IP address on page load
function getUserIP() {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip;
            document.getElementById('ipAddress').textContent = userIP;
            // On page load, also get and display information about the user
            getUserInfo();
        })
        .catch(error => console.error('Error fetching IP:', error));
}

// Function to get user's information on button click
function getUserInfo() {
    const userIP = document.getElementById('ipAddress').textContent;
    fetch(`https://ipapi.co/${userIP}/json/`)
        .then(response => response.json())
        .then(userData => {
            const lat = userData.latitude;
            const lon = userData.longitude;

            // Show user's location on Google Map
            showMap(lat, lon);

            // Get and display time in user's location
            const timezone = userData.timezone;
            showTimeByTimeZone(timezone);

            // Get list of post offices based on pincode
            const pincode = userData.postal;
            getPostOffices(pincode);
        })
        .catch(error => console.error('Error fetching user info:', error));
}

// Function to display the map using lat and lon
function showMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    mapDiv.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
}

// Function to display time using the provided timezone
function showTimeByTimeZone(timezone) {
    const timeElement = document.getElementById('timeZone');
    const userTime = new Date().toLocaleString('en-US', { timeZone: timezone });
    timeElement.textContent = `Time Zone: ${timezone}, Current Time: ${userTime}`;
}

// Function to get list of post offices based on pincode
function getPostOffices(pincode) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(response => response.json())
        .then(postalData => {
            postOfficesData = postalData[0].PostOffice;
            displayPostOffices(postOfficesData);
        })
        .catch(error => console.error('Error fetching post offices:', error));
}

// Function to display the list of post offices
function displayPostOffices(postOffices) {
    const postOfficesElement = document.getElementById('postOfficesResult');
    postOfficesElement.innerHTML = postOffices.map(office => `<li>${office.Name}, ${office.District}</li>`).join('');
}

// Function to filter post offices based on search input
function filterPostOffices() {
    const searchBoxValue = document.getElementById('searchBoxResult').value.toLowerCase();
    const filteredOffices = postOfficesData.filter(office => office.Name.toLowerCase().includes(searchBoxValue));
    displayPostOffices(filteredOffices);
}

// Call the function to get the user's IP when the page loads
getUserIP();