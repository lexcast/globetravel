import { lazy, Suspense, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useTheme from "../hooks/useTheme";
import { deriveCountries } from "../utils/data";
import Menu from "./Menu";
import Brand from "./Brand";

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
  const [theme, setTheme] = useTheme();

  const countries = useMemo(
    () => deriveCountries(cities, travels),
    [cities, travels]
  );

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-[radial-gradient(ellipse_at_35%_40%,#ffffff_0%,#e2e8f0_55%,#cbd5e1_100%)] dark:bg-[radial-gradient(ellipse_at_35%_40%,#0f1f3d_0%,#050b1a_55%,#020617_100%)]">
      <div className="absolute inset-0 md:right-[432px]">
        <Suspense>
          <Globe
            cities={cities}
            travels={travels}
            hideCities={hideCities}
            hideTravels={hideTravels}
            hideFlights={hideFlights}
            theme={theme}
          />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute top-4 left-4 md:hidden">
        <Brand />
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
          theme,
          setTheme,
        }}
      />
    </div>
  );
};

export default App;
