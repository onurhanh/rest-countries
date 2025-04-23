import { useContext, useEffect } from "react";
import { DataContext } from "../App";

export function CountryContent({ country, region, onCountryClick }) {

  const { data } = useContext(DataContext);
  useEffect(() => {
    const handleHashChange = () => {
      const selectedCountry = data.find(x => `/detail/${x.cca3}` === location.hash);
      if (selectedCountry) {
        onCountryClick(selectedCountry);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [data, onCountryClick]);

  const dataItems = data
    .filter(x => x.name.common.toLowerCase().includes(country) && x.region.includes(region))
    .map(x => <Countries
      key={x.name.common}
      name={x.name.common}
      population={x.population}
      region={x.region}
      capital={x.capital}
      img={x.flags.png}
      // {...x}
      onCountryClick={() => {
        location.hash = `/detail/${x.cca3}`; // URL'yi güncelle
        onCountryClick(x); // Seçili ülkeyi güncelle
      }}
    />)

  return (
    <>
      <div className="countries">
        <div className="country-list">{dataItems}</div>
      </div>
    </>
  )
}

export function Countries({ name, img, population, region, capital, onCountryClick }) {

  return (
    <>
      <div className="countryItem">
        <div onClick={onCountryClick} className="card-inner">
          <img src={img} alt={name} />
          <div className="card-info">
            <h2>{name}</h2>
            <p>
              <span>Population: </span>
              {population}
            </p>
            <p>
              <span>Region: </span>
              {region}
            </p>
            <p>
              <span>Capital: </span>
              {capital}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}