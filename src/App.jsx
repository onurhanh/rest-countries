import { createContext, useEffect, useState } from "react";
import { data } from "../public/data/data.jsx";
import { Header } from "./components/Header.jsx";
import { CountryContent } from "./components/CountryContent.jsx";
import { CountryDetails } from "./components/CountryDetails.jsx";
import "./assets/css/darkMode.css";

export const DataContext = createContext(null); // tüm datayı gönderebilmek için useContext
export const ThemeContext = createContext(null); // temayı tüm componentlere geçirmek için useContext

const routes = [
  {
    url: "/",
    component: <CountryContent />
  },
  {
    url: "/detail",
    component: <CountryDetails />
  },
];

export function getPage(url) {
  return routes.findLast((x) => url.startsWith(x.url)).component || <CountryContent />;
}

export function getUrlParam() {
  const parts = location.hash.substring(1).split('/');
  return parts.length > 1 ? parts[1] : null;  // id varsa al yoksa null dön
}

function App() {
  const [showDetails, setShowDetails] = useState(false); // Detay sayfasını kontrol eden state
  const [selectedCountry, setSelectedCountry] = useState(null); // Tıklanan ülkeyi saklayan state
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [url, setUrl] = useState(location.hash.substring(1) || "/");

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setUrl(location.hash.substring(1));
    });

  }, []);

  useEffect(() => {
    const countryId = getUrlParam();
    if (countryId) {
      const foundedCountry = data.find((country) => country.cca3 === countryId);
      if (foundedCountry) {
        setSelectedCountry(foundedCountry);
        setShowDetails(true);
      } else {
        setShowDetails(false);
      }
    }
  }, [url]);

  function handleCountryClick(country) {
    setSelectedCountry(country);
    setShowDetails(true); // Detay sayfasını göster
    window.location.hash = `#/${country.cca3}`;  // URL'yi güncelle
  }

  function handleBorderCountryClick(borderCountry) {
    setSelectedCountry(borderCountry); // Border Countries göster
    window.location.hash = `#/${borderCountry.cca3}`; // URL'yi güncelle
  }

  function getSystemThemePref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light';
  }

  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref()); // dark mode için olan state

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChangeTheme() {
    setTheme(prev => (prev === "dark-mode" ? "light" : "dark-mode"));
    localStorage.theme = theme === "dark-mode" ? "light" : "dark-mode";
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <DataContext.Provider value={{ data }}>
        <div className="container">
          <Header handleChangeTheme={handleChangeTheme} setRegion={setRegion} setCountry={setCountry} showDetails={showDetails} />
          {showDetails ? (
            <>
              <CountryDetails
                key={selectedCountry?.cca3}
                country={selectedCountry}
                setShowDetails={setShowDetails}
                onClickBorderCountry={handleBorderCountryClick} />
            </>
          ) : (
            <>
              <CountryContent
                country={country}
                region={region}
                onCountryClick={handleCountryClick}
              />
            </>
          )}
        </div>
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;