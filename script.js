const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const countryDropdown = document.getElementById('countryDropdown');
const countryImage = document.getElementById('countryImage');
const countryName = document.getElementById('countryName');
const countryPopulation = document.getElementById('countryPopulation');
const countryInfoList = document.getElementById('countryInfoList');
const countryCardContainer = document.getElementById('countryCardContainer');

// Fetch country data from the provided API link
function fetchCountryData() {
    fetch('https://restcountries.com/v3.1/all?fields=name,population,capital,region,flags')
        .then(response => response.json())
        .then(data => {
            // Clear previous cards
            countryCardContainer.innerHTML = '';

            // Loop through the data and create cards for each country
            data.forEach(country => {
                const card = createCountryCard(country);
                countryCardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}

// Function to create a country card
function createCountryCard(country) {
    const card = document.createElement('div');
    card.classList.add('country-card');

    const flagImage = document.createElement('img');
    flagImage.classList.add('country-flag');
    flagImage.src = country.flags.png;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('country-details');

    const nameHeading = document.createElement('h2');
    nameHeading.classList.add('country-name');
    nameHeading.textContent = country.name.common;

    const populationParagraph = document.createElement('p');
    populationParagraph.classList.add('country-population');
    populationParagraph.textContent = `Population: ${country.population}`;



    const capitalParagraph = document.createElement('p');
    capitalParagraph.classList.add('country-capital');
    capitalParagraph.textContent = `Capital: ${country.capital.join(', ')}`;

    const regionParagraph = document.createElement('p');
    regionParagraph.classList.add('country-region');
    regionParagraph.textContent = `Region: ${country.region}`;

    detailsDiv.appendChild(nameHeading);
    detailsDiv.appendChild(populationParagraph);

    detailsDiv.appendChild(capitalParagraph);
    detailsDiv.appendChild(regionParagraph);

    card.appendChild(flagImage);
    card.appendChild(detailsDiv);

    // Add a click event listener to the card to show details
    card.addEventListener('click', () => {
        updateCountryDetails(country);
    });

    return card;
}

// Function to update the country details section
function updateCountryDetails(country) {
    countryImage.src = country.flags.png;
    countryName.textContent = country.name.common;
    countryPopulation.textContent = `Population: ${country.population}`;
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Loop through cards and hide/show based on the search term
    const cards = document.querySelectorAll('.country-card');
    cards.forEach(card => {
        const countryName = card.querySelector('.country-name').textContent.toLowerCase();
        if (countryName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Initialize the interface
fetchCountryData();


function populateCountryDropdown(){
    fetch('https://restcountries/v3.1/all')
    .then(response=>response.json())
    .then(data =>{
        data.forEach(country=>{
            const option = document.createElement('option');
            option.value=country.name.common;
            option.textContent= country.name.common;
            countryDropdown.appendChild(option);
        });
    })

    .catch(error =>{console.error('error fetching country list:', error)})
}
