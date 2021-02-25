import React, { useState } from "react";
import Globe from "./Globe";
import Search from "./Search";
import Travel from "./Travel";
import Cities from "./Cities";
import Countries from "./Countries";
import pick from "object.pick";

const CITY_FIELDS = [
  "geonameId",
  "name",
  "countryCode",
  "adminName1",
  "lat",
  "lng",
];

const App = () => {
  const [form, setForm] = useState();
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const removeCity = (id) => {
    setCities(cities.filter((c) => id !== c.geonameId));
  };

  const addCity = (c) => {
    const city = pick(c, CITY_FIELDS);

    setCities([...cities, city]);
    if (!countries.includes(city.countryCode)) {
      setCountries([...countries, city.countryCode]);
    }
  };

  const addTravel = (t) => {
    // const city = pick(c, CITY_FIELDS);
    // setCities([...cities, city]);
    // if (!countries.includes(city.countryCode)) {
    //   setCountries([...countries, city.countryCode]);
    // }
  };

  return (
    <div className="text-gray-300 w-screen h-screen bg-gray-900 flex overflow-hidden flex-no-wrap">
      <Globe />
      <div className="flex-1 flex flex-col flex-wrap px-10 py-16">
        {countries.length > 0 && <Countries countries={countries} />}
        <div className="flex-1">
          <div className="flex justify-around mb-8">
            <button
              onClick={() => setForm(form === "city" ? null : "city")}
              className="focus:outline-none focus:ring rounded-full bg-gray-800 h-8 px-4 flex items-center text-gray-300 hover:bg-gray-700 font-bolt"
            >
              Add City
            </button>
            <button
              onClick={() => setForm(form === "travel" ? null : "travel")}
              className="focus:outline-none focus:ring rounded-full bg-gray-800 h-8 px-4 flex items-center text-gray-300 hover:bg-gray-700 font-bolt"
            >
              Add Travel
            </button>
          </div>
          {form === "city" && <Search onSelect={(c) => addCity(c)} />}
          {form === "travel" && <Travel onFinish={(t) => addTravel(t)} />}
        </div>
        {cities.length > 0 && <Cities cities={cities} onRemove={removeCity} />}
      </div>
    </div>
  );
};

export default App;
