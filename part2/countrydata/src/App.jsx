import { useEffect, useState } from "react";
import CountrysService from "./services/CountrysService";
import Countrys from "./components/Countrys";
const App = () => {
  const [allCountrys, setAllCountrys] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    CountrysService.getAll().then((allCountrysResponse) => {
      setAllCountrys(allCountrysResponse);
      console.log(allCountrysResponse);
    });
  }, []);
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const countrysToShown =
    filter == ""
      ? allCountrys
      : allCountrys.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );


  return (
    <>
      <div>
        Find Countrys
        <input onChange={handleFilterChange} />
      </div>
      <div>
        <Countrys setFilter={setFilter} display={countrysToShown} />
      </div>
    </>
  );
};

export default App;
