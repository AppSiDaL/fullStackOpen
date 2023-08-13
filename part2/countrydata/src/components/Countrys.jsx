import Weather from "./Weather";

const Countrys = ({ display, setFilter }) => {
  if (display.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (display.length > 1) {
    return (
      <div>
        {display.map((country, index) => (
          <div key={"country" + index}>
            <p key={"p" + index}>{country.name.common}</p>
            <button
              key={"b" + index}
              onClick={() => setFilter(country.name.common)}
            >
              Show
            </button>
          </div>
        ))}
      </div>
    );
  } else if (display.length === 1) {
    const countryToShow = display[0];
    return (
      <div>
        <h2>{countryToShow?.name?.common}</h2>
        <p>Capital: {countryToShow?.capital}</p>
        <p>Area: {countryToShow?.area}</p>
        <h3>Languages:</h3>
        <ul>
          {countryToShow?.languages &&
            Object.keys(countryToShow?.languages).map((code) => (
              <li key={code}>{countryToShow?.languages[code]}</li>
            ))}
        </ul>
        {countryToShow?.flags && (
          <img
            src={countryToShow?.flags?.png}
            alt={countryToShow?.flags?.alt}
          />
        )}
        <Weather coordinates={countryToShow?.capitalInfo?.latlng} />
      </div>
    );
  }
};

export default Countrys;
