import { lazy, Suspense, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { deriveCountries } from "../utils/data";
import Menu from "./Menu";

const Globe = lazy(() => import("./Globe"));

const App = () => {
  const [cities, setCities] = useLocalStorage("@globetravel.cities", []);
  const [travels, setTravels] = useLocalStorage("@globetravel.travels", []);
  const [hideCities, setHideCities] = useLocalStorage(
    "@globetravel.hideCities",
    false
  );
  const [hideTravels, setHideTravels] = useLocalStorage(
    "@globetravel.hideTravels",
    false
  );
  const [hideFlights, setHideFlights] = useLocalStorage(
    "@globetravel.hideFlights",
    false
  );

  const countries = useMemo(
    () => deriveCountries(cities, travels),
    [cities, travels]
  );

  return (
    <div className="text-gray-300 w-screen h-screen bg-gray-950 flex overflow-hidden flex-no-wrap">
      <div className="h-screen w-full md:w-2/3 bg-gray-950">
        <Suspense>
          <Globe
            cities={cities}
            travels={travels}
            hideCities={hideCities}
            hideTravels={hideTravels}
            hideFlights={hideFlights}
          />
        </Suspense>
      </div>
      <Menu
        {...{
          cities,
          setCities,
          travels,
          setTravels,
          countries,
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
