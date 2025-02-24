const filePath = "https://restcountries.com/v3.1/all";


const countries = [];
const productsContainer = document.querySelector(".products-container");
const modal = document.getElementById("countryModal");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.querySelector(".close-modal");


async function getCountries(){
    try{
      productsContainer.innerHTML = `<i id="loading" class="fa-solid fa-spinner fa-spin"></i>`;
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
    countries.forEach((country, index) =>{
        productsContainer.innerHTML +=  `
            <div class="content-container" data-index="${index}">
                <img src="${country.flags.png}" alt="Germany">
                <h1 class="country-name">${country.name.common}</h1>
                <div class="content-info">
                    <div class="population">
                        <h5>Population:</h5>
                        <p>${country.population.toLocaleString()}</p>
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

    document.querySelectorAll(".content-container").forEach(item => {
      item.addEventListener("click", function () {
          const countryIndex = this.getAttribute("data-index");
          openModal(countries[countryIndex]);
      });
  });

  }



  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const productsContainer = document.querySelector(".products-container");
    searchInput.addEventListener("keyup", () => {
        let searchText = searchInput.value.toLowerCase();
        let contentContainer = document.querySelectorAll(".content-container");

        contentContainer.forEach(item => {
            let countryName = item.querySelector("h1").textContent.toLowerCase();
            item.style.display = countryName.includes(searchText) ? "block" : "none";
        });
    });
});

function openModal(country) {
 
  productsContainer.innerHTML = `<i id="loading" class="fa-solid fa-spinner fa-spin"></i>`;
  productsContainer.innerHTML = "";
  modalDetails.innerHTML = ""; 
  modalDetails.innerHTML += `
  <div class="dark-countries">
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
      <div class="dark-country-container">
          <h2>${country.name.common}</h2>
          <div class="dark-country-content">
              <p>Native Name: <span>${country.name.common}</span></p>
              <p>Population: <span>${country.population}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Sub Region: <span>${country.subregion}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
          </div>
          <div class="dark-country-details">
              <p>Top Level Domain: <span>${country.tld}</span></p>
          </div>
          <div class="dark-border">
              <h2>Border Countries:</h2>
              <div class="dark-border-box">
                  ${country.borders && country.borders.length > 0 
                      ? country.borders.map(border => `<p>${border}</p>`).join("") 
                      : "<p>None</p>"}
              </div>
          </div>
      </div>
  </div>
  `
  modal.style.display = "flex";
  console.log("Seçilen Ülke Verisi:", country);
}




closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  getCountries();
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
      modal.style.display = "none";
  }
});

getCountries();
