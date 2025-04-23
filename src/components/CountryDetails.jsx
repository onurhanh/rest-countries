import { useContext } from "react";
import { ThemeContext } from "../App";
import { DataContext } from "../App";

export function CountryDetails({ country, setShowDetails, onClickBorderCountry }) {

  const { theme } = useContext(ThemeContext);
  if (!country) return null; // Eğer seçilen ülke yoksa render etme

  return (
    <>
      <div className="country-details">
        <button className="backBtn" onClick={() => { setShowDetails(false); location.hash = "/" }}>
          <img src={theme === "light" ? "/img/back-icon.svg" : "/img/back-icon-dark-mode.svg"} alt="Moon Icon" />
          Back
        </button>
        <div className="card-details">
          <img src={country.flags.png} alt={country.name} />
          <div className="card-details-info">
            <h1>
              {country.name.common.split("").map((char, i) => (
                <span
                  key={i}
                  className={`letter-fade${char === " " ? " space" : ""}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <div className="card-detail-first">
              <p><strong>Native Name: </strong>{country.name.official}</p>
              <p><strong>Population:</strong>{country.population}</p>
              <p><strong>Region: </strong>{country.region}</p>
              <p><strong>Sub Region: </strong>{country.subregion ? country.subregion : "-"}</p>
              <p><strong>Capital: </strong> {country.capital?.join(", ")}</p>
            </div>
            <div className="card-detail-second">
              <p><strong>Top Level Domain: </strong> {country.tld?.join(", ")}</p>
              <p><strong>Currencies: </strong>{Object.values(country.currencies)
                .map((x) => x.name)
                .join(", ")}</p>
              <p><strong>Languages: </strong>{Object.values(country.languages).join(", ")}</p>
            </div>
            <div className="border-countries-content">
              <h4>Border Countries:</h4>
              <div className="border-countries">
                <BorderCountries borders={country.borders} onClickBorderCountry={onClickBorderCountry} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function BorderCountries({ borders, onClickBorderCountry }) {

  const { data } = useContext(DataContext);

  return (
    <>
      {borders && borders.length > 0
        ? borders.map((x) => {
          const countryData = data.find((y) => y.cca3 === x);
          return (
            <button
              onClick={() => {
                location.hash = `/detail/${countryData?.cca3}`;
                onClickBorderCountry(countryData);
              }}
              key={x}
              className="borderBtn"
            >
              {countryData?.name?.common}
            </button>
          );
        })
        : <div className="no-border-cntry">
          <p>This country does not share borders with any other countries.</p>
        </div>}
    </>
  )
}