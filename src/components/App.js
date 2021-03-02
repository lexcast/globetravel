import React, { useState } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import Globe from "./Globe";
import Search from "./Search";
import Travel from "./Travel";
import Travels from "./Travels";
import Cities from "./Cities";
import Countries from "./Countries";
import Export from "./Export";
import Import from "./Import";
import Reset from "./Reset";
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
  const [cities, setCities] = useLocalStorage("@globetravel.cities", []);
  const [travels, setTravels] = useLocalStorage("@globetravel.travels", []);
  const [countries, setCountries] = useLocalStorage(
    "@globetravel.countries",
    []
  );

  const hasCountry = (countryCode, cs, ts) => {
    return (
      cs.some((c) => c.countryCode === countryCode) ||
      ts.some(
        (t) =>
          t.start.countryCode === countryCode ||
          t.end.countryCode === countryCode
      )
    );
  };

  const removeCity = ({ geonameId, countryCode }) => {
    const newCities = cities.filter((c) => geonameId !== c.geonameId);
    setCities(newCities);

    if (!hasCountry(countryCode, newCities, travels)) {
      setCountries(countries.filter((c) => c !== countryCode));
    }
  };

  const addCity = (c) => {
    const city = pick(c, CITY_FIELDS);

    setCities([...cities, city]);
    if (!countries.includes(city.countryCode)) {
      setCountries([...countries, city.countryCode]);
    }
  };

  const removeTravel = ({ id, start, end }) => {
    const newTravels = travels.filter((t) => id !== t.id);
    setTravels(newTravels);

    if (!hasCountry(start.countryCode, cities, newTravels)) {
      setCountries((cs) => cs.filter((c) => c !== start.countryCode));
    }

    if (!hasCountry(end.countryCode, cities, newTravels)) {
      setCountries((cs) => cs.filter((c) => c !== end.countryCode));
    }
  };

  const addTravel = (type, s, e) => {
    const start = pick(s, CITY_FIELDS);
    const end = pick(e, CITY_FIELDS);
    const id = s.geonameId + "_" + e.geonameId;

    setTravels([...travels, { type, start, end, id }]);

    if (!countries.includes(s.countryCode)) {
      setCountries((c) => [...c, s.countryCode]);
    }

    if (!countries.includes(e.countryCode)) {
      setCountries((c) => [...c, e.countryCode]);
    }
  };

  return (
    <div className="text-gray-300 w-screen h-screen bg-gray-900 flex overflow-hidden flex-no-wrap">
      <div className="h-screen w-2/3 bg-gray-900">
        <Globe cities={cities} travels={travels} />
      </div>
      <div className="flex-1 flex flex-col flex-nowrap px-10 pt-14 pb-4 h-screen overflow-y-auto">
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
          {form === "city" && <Search onSelect={addCity} />}
          {form === "travel" && <Travel onFinish={addTravel} />}
        </div>
        {cities.length > 0 && <Cities cities={cities} onRemove={removeCity} />}
        {travels.length > 0 && (
          <Travels travels={travels} onRemove={removeTravel} />
        )}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Reset {...{ setCities, setTravels, setCountries }} />
          <Import {...{ setCities, setTravels, setCountries }} />
          <Export {...{ cities, travels, countries }} />
        </div>
      </div>
    </div>
  );
};

export default App;
