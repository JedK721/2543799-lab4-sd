document.getElementById("btnSubmit")
    .addEventListener("submit", fetchCountryData);

function fetchCountryData() 
{
    const countryName = document.getElementById("country").value;

    if (!countryName)
    {
        throw new Error("Please enter a country name.");
        return;
    }

    const apiUrl = 'https://restcountries.com/v3.1/all';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok)
            {
                throw new Error("Country not found. Please try again.");
            }
            return response.json();
        })
        .then(country =>
            console.log(country)
        );
        .catch


    document

    const handleCountryInfo = (countryDetails) => {
        console.log(countryDetails.value);
    }
}