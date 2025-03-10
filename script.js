document.addEventListener("DOMContentLoaded", () => 
{
    document.getElementById("btnSubmit").addEventListener("click", fetchCountryData);
});

function fetchCountryData() 
{
    const countryName = document.getElementById("country").value.trim();

    if (!countryName) 
    {
        throw new Error("Please enter a country name.");
    }

    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
        .then(response => 
        {
            if (!response.ok) 
            {
                throw new Error("Country not found.");
            }
            return response.json();
        })
        .then(data => 
        {
            dispInfo(data[0]);
        })
        .catch(error => 
        {
            throw new Error(error.message);
        });
}

function dispInfo(country) 
{
    const countryDetails = document.getElementById("country-details");
    countryDetails.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = country.name.common;

    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `Flag of ${country.name.common}`;
    flag.width = 150;

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;

    const population = document.createElement("p");
    population.textContent = `Population: ${country.population.toLocaleString()}`;

    const region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;

    countryDetails.append(title, flag, capital, population, region);

    if (country.borders && country.borders.length > 0) 
    {
        fetchBorderingCountries(country.borders);
    } else 
    {
        document.getElementById("borders-list").textContent = "No bordering countries.";
    }
}

function fetchBorderingCountries(borderCodes) 
{
    const apiUrl = `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const bordersList = document.getElementById("borders-list");
            bordersList.innerHTML = "";

            data.forEach(country => {
                const borderDiv = document.createElement("div");
                borderDiv.classList.add("border-country");

                const flag = document.createElement("img");
                flag.src = country.flags.png;
                flag.alt = `Flag of ${country.name.common}`;

                const name = document.createElement("p");
                name.textContent = country.name.common;

                borderDiv.append(flag, name);
                bordersList.appendChild(borderDiv);
            });
        })
        .catch(() => {
            document.getElementById("borders-list").textContent = "Error loading bordering countries.";
        });
}

