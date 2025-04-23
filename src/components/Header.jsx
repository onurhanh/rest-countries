import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { DataContext } from "../App";

export function Input({ setCountry, setRegion }) {
  const { data } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const regions = Array.from(new Set(data.map(x => x.region)));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");

  function handleChange(e) {
    setCountry(e.target.value.toLowerCase());
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleSelect(region) {
    setSelectedRegion(region);
    setRegion(region);
    setDropdownOpen(false);
  }

  return (
    <>
      <div className="input-area">
        <div className="search-wrapper">
          <img src="/img/search-icon.svg" alt="Search Icon" className="search-icon" />
          <input type="text" onChange={handleChange} placeholder="Search for a country..." />
        </div>

        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedRegion || "Filter by Region"}
            <img className="arrow"
              src={theme === "light" ? "/img/arrow-light-icon.svg" : "/img/arrow-dark-icon.svg"} alt="Arrow Icon" />
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {regions.map(region => (
                <li key={region} onClick={() => handleSelect(region)}>
                  {region}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export function Header({ handleChangeTheme, setCountry, setRegion, showDetails }) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="header">
        <h1 onClick={() => window.location.href = "/"}
          style={{ cursor: "pointer" }}>
          Where in the world?
        </h1>
        <button className="dark-mode-btn" onClick={handleChangeTheme}>
          <img src={theme === "light" ? "/img/light-moon-icon.svg" : "/img/dark-moon-icon.svg"} alt="Moon Icon" />
          Dark Mode
        </button>
      </div>
      {!showDetails && <Input
        setCountry={setCountry}
        setRegion={setRegion}
      />}
    </>
  )
}