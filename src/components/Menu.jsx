import { useState } from "react";
import Search from "./Search";
import Travel from "./Travel";
import Travels from "./Travels";
import Cities from "./Cities";
import Countries from "./Countries";
import Export from "./Export";
import Import from "./Import";
import Reset from "./Reset";
import Footer from "./Footer";
import Brand from "./Brand";
import Stats from "./Stats";
import ThemeSwitch from "./ThemeSwitch";
import { createTravel, hasCity, hasTravel, pickCity } from "../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faLocationDot,
  faRoute,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const FORMS = [
  { name: "city", label: "Add city", icon: faLocationDot },
  { name: "travel", label: "Add travel", icon: faRoute },
];

const Menu = ({
  cities,
  setCities,
  travels,
  setTravels,
  countries,
  hideTravels,
  setHideTravels,
  hideCities,
  setHideCities,
  hideFlights,
  setHideFlights,
  theme,
  setTheme,
}) => {
  const [form, setForm] = useState();
  const [show, setShow] = useState(false);

  const removeCity = ({ geonameId }) =>
    setCities((cs) => cs.filter((c) => c.geonameId !== geonameId));

  const addCity = (city) =>
    setCities((cs) => (hasCity(cs, city) ? cs : [...cs, pickCity(city)]));

  const removeTravel = ({ id }) =>
    setTravels((ts) => ts.filter((t) => t.id !== id));

  const addTravel = (type, start, end) => {
    if (start.geonameId === end.geonameId) return;

    setTravels((ts) =>
      hasTravel(ts, type, start, end)
        ? ts
        : [...ts, createTravel(type, start, end)]
    );
  };

  const toggleForm = (name) => setForm(form === name ? null : name);

  const empty = cities.length === 0 && travels.length === 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Close menu" : "Open menu"}
        aria-expanded={show}
        aria-controls="menu"
        className="absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-lg backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 md:hidden dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200"
      >
        <FontAwesomeIcon icon={show ? faTimes : faBars} />
      </button>
      <aside
        id="menu"
        className={
          "absolute inset-x-0 bottom-0 z-20 flex max-h-[85dvh] flex-col rounded-t-3xl border border-slate-200/80 bg-white/85 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out md:top-4 md:right-4 md:bottom-4 md:left-auto md:max-h-none md:w-[400px] md:translate-y-0 md:rounded-3xl dark:border-white/10 dark:bg-slate-900/75 " +
          (show ? "translate-y-0" : "translate-y-full")
        }
      >
        <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-300 md:hidden dark:bg-slate-700" />
        <header className="flex items-center justify-between px-5 pt-4 pb-2 md:pt-5">
          <div className="hidden md:block">
            <Brand />
          </div>
          <span className="text-sm font-semibold md:hidden">Your travels</span>
          <ThemeSwitch theme={theme} setTheme={setTheme} />
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-3">
          <Stats {...{ countries, cities, travels }} />
          {countries.length > 0 && <Countries countries={countries} />}

          <div>
            <div
              role="group"
              aria-label="Add to your map"
              className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-900/5 p-1 dark:bg-white/5"
            >
              {FORMS.map(({ name, label, icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleForm(name)}
                  aria-pressed={form === name}
                  className={
                    "flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 " +
                    (form === name
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white")
                  }
                >
                  <FontAwesomeIcon icon={icon} className="text-sky-500" />
                  {label}
                </button>
              ))}
            </div>
            {form && (
              <div className="mt-3">
                {form === "city" && <Search onSelect={addCity} />}
                {form === "travel" && <Travel onFinish={addTravel} />}
              </div>
            )}
          </div>

          {empty && !form && (
            <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Add the cities you've visited and the trips between them to see
              them on the globe.
            </p>
          )}
          {cities.length > 0 && (
            <Cities
              cities={cities}
              onRemove={removeCity}
              hide={hideCities}
              setHide={setHideCities}
            />
          )}
          {travels.length > 0 && (
            <Travels
              travels={travels}
              onRemove={removeTravel}
              hide={hideTravels}
              setHide={setHideTravels}
              hideFlights={hideFlights}
              setHideFlights={setHideFlights}
            />
          )}
        </div>

        <footer className="flex items-center justify-between gap-4 border-t border-slate-200/80 px-5 py-3 dark:border-white/5">
          <Footer />
          <div className="flex items-center gap-1">
            <Reset {...{ setCities, setTravels }} />
            <Import {...{ setCities, setTravels }} />
            <Export {...{ cities, travels, countries }} />
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Menu;
