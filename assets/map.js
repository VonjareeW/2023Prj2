

const apiKey = 'AIzaSyANKCXEsa8FBoLHiB1jk9V6to0BfkOxJdg';

// Initialize Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Set an initial center
        zoom: 14, // Set an initial zoom level
    });

    const searchButton = document.getElementById('gym-search');
    searchButton.addEventListener('click', () => {
        const zipcode = document.getElementById('zipcode').value;

        // Use the Geocoding API to convert ZIP code to coordinates
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: zipcode }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;

                // Update the map to center on the ZIP code location
                map.setCenter(location);

                // Use the Places API to find gyms near the location
                const placesService = new google.maps.places.PlacesService(map);
                placesService.nearbySearch({
                    location,
                    radius: 5000, // Search within a 5 km radius
                    keyword: 'gym',
                }, (results, status) => {
                    if (status === 'OK') {
                        displayGyms(results);
                    }
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    });

    // Display gyms in the gyms div
    function displayGyms(gyms) {
        const gymsDiv = document.getElementById('gyms');
        gymsDiv.innerHTML = '';

        for (const gym of gyms) {
            const gymName = gym.name;
            const gymAddress = gym.vicinity;

            const gymInfo = document.createElement('p');
            gymInfo.textContent = `${gymName} - ${gymAddress}`;
            gymsDiv.appendChild(gymInfo);
        }
    }
}



