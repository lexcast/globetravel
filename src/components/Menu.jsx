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
import { createTravel, hasCity, hasTravel, pickCity } from "../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Close menu" : "Open menu"}
        aria-expanded={show}
        aria-controls="menu"
        className="z-20 md:hidden absolute top-0 right-0 mt-4 mr-4 focus:outline-none focus:ring rounded-full bg-gray-800 h-8 w-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 font-bolt"
      >
        <FontAwesomeIcon icon={show ? faTimes : faBars} />
      </button>
      <div
        id="menu"
        className={
          "bg-gray-900 absolute w-full md:relative flex-1 flex-col flex-nowrap px-10 pt-14 pb-4 h-screen overflow-y-auto " +
          (show ? "flex" : "hidden md:flex")
        }
      >
        {countries.length > 0 && <Countries countries={countries} />}
        <div className="flex-1">
          <div className="flex justify-around mb-8">
            <button
              type="button"
              onClick={() => toggleForm("city")}
              aria-pressed={form === "city"}
              className="focus:outline-none focus:ring rounded-full bg-gray-800 h-8 px-4 flex items-center text-gray-300 hover:bg-gray-700 font-bolt"
            >
              Add City
            </button>
            <button
              type="button"
              onClick={() => toggleForm("travel")}
              aria-pressed={form === "travel"}
              className="focus:outline-none focus:ring rounded-full bg-gray-800 h-8 px-4 flex items-center text-gray-300 hover:bg-gray-700 font-bolt"
            >
              Add Travel
            </button>
          </div>
          {form === "city" && <Search onSelect={addCity} />}
          {form === "travel" && <Travel onFinish={addTravel} />}
        </div>
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
        <div className="mt-6 flex items-center justify-end gap-4">
          <Reset {...{ setCities, setTravels }} />
          <Import {...{ setCities, setTravels }} />
          <Export {...{ cities, travels, countries }} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Menu;
