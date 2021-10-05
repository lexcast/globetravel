import React from "react";
import useLocalStorage from "hooks/useLocalStorage";
import Globe from "./Globe";
import Menu from "./Menu";

const App = () => {
  const [cities, setCities] = useLocalStorage("@globetravel.cities", []);
  const [travels, setTravels] = useLocalStorage("@globetravel.travels", []);
  const [countries, setCountries] = useLocalStorage(
    "@globetravel.countries",
    []
  );

  return (
    <div className="text-gray-300 w-screen h-screen bg-gray-900 flex overflow-hidden flex-no-wrap">
      <div className="h-screen w-full md:w-2/3 bg-gray-900">
        <Globe cities={cities} travels={travels} />
      </div>
      <Menu
        {...{ cities, setCities, travels, setTravels, countries, setCountries }}
      />
    </div>
  );
};

export default App;
