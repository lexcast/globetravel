import React from "react";
import useLocalStorage from "hooks/useLocalStorage";
import Globe from "./Globe";
import Menu from "./Menu";

const App = () => {
  const [cities, setCities] = useLocalStorage("@globetravel.cities", []);
  const [hideCities, setHideCities] = useLocalStorage(false);
  const [travels, setTravels] = useLocalStorage("@globetravel.travels", []);
  const [hideTravels, setHideTravels] = useLocalStorage(false);
  const [hideFlights, setHideFlights] = useLocalStorage(false);
  const [countries, setCountries] = useLocalStorage(
    "@globetravel.countries",
    []
  );

  return (
    <div className="text-gray-300 w-screen h-screen bg-gray-900 flex overflow-hidden flex-no-wrap">
      <div className="h-screen w-full md:w-2/3 bg-gray-900">
        <Globe
          cities={cities}
          travels={travels}
          hideCities={hideCities}
          hideTravels={hideTravels}
          hideFlights={hideFlights}
        />
      </div>
      <Menu
        {...{
          cities,
          setCities,
          travels,
          setTravels,
          countries,
          setCountries,
          hideCities,
          setHideCities,
          hideTravels,
          setHideTravels,
          hideFlights,
          setHideFlights,
        }}
      />
    </div>
  );
};

export default App;
