const filePath = "https://restcountries.com/v3.1/all";


const countries = [];
const productsContainer = document.querySelector(".products-container");
async function getCountries(){
    try{
      const response = await fetch(filePath);
      if(!response.ok){
        throw new Error("Veri alınamadı.");
      }
      const data = await response.json();
      countries.push(...data);
      renderCountries();
    }
    catch(error){
      console.log(error);
    }
  }

  function renderCountries(){
    productsContainer.innerHTML = "";
    countries.forEach(country =>{
        productsContainer.innerHTML +=  `
            <div class="content-container">
                <img src="${country.flags.png}" alt="Germany">
                <h1 class="country-name">${country.name.common}</h1>
                <div class="content-info">
                    <div class="population">
                        <h5>Population:</h5>
                        <p>${country.population}</p>
                    </div>
                    <div class="region">
                        <h5>Region:</h5>
                        <p>${country.region}</p>
                    </div>
                    <div class="capital">
                        <h5>Capital:</h5>
                        <p>${country.capital}</p>
                    </div>
                </div>
            </div>
        `
    });
  
  }
  getCountries();


  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const productsContainer = document.querySelector(".products-container");
    searchInput.addEventListener("keyup", () => {
        let searchText = searchInput.value.toLowerCase();
        let countryItems = document.querySelectorAll(".countries");

        countryItems.forEach(item => {
            let countryName = item.querySelector("h2").textContent.toLowerCase();
            item.style.display = countryName.includes(searchText) ? "block" : "none";
        });
    });
});