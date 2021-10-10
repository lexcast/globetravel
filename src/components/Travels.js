import React from "react";
import emoji from "utils/emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlane,
  faTrain,
  faShip,
  faBus,
  faCar,
  faAngleRight,
  faEye,
  faEyeSlash,
  faPlaneSlash,
} from "@fortawesome/free-solid-svg-icons";

const TYPES = {
  flight: faPlane,
  trail: faTrain,
  sail: faShip,
  bus: faBus,
  car: faCar,
};

const Travels = ({
  travels,
  onRemove,
  hide,
  setHide,
  hideFlights,
  setHideFlights,
}) => {
  return (
    <>
      <span className="text-xs font-medium mb-1 mt-2 flex items-center justify-between">
        <span>
          TRAVELS <span className="text-gray-400">({travels.length})</span>
        </span>
        <div className="flex items-center">
          <div
            onClick={() => setHideFlights(!hideFlights)}
            className="mx-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 cursor-pointer hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={!hideFlights ? faPlane : faPlaneSlash} />
          </div>
          <div
            onClick={() => setHide(!hide)}
            className="flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 cursor-pointer hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={!hide ? faEye : faEyeSlash} />
          </div>
        </div>
      </span>
      <div className="text-xs max-h-24 bg-gray-800 rounded-lg overflow-y-auto">
        {travels.map((t) => (
          <div
            key={t.id}
            className="group cursor-pointer px-3 py-2 flex items-center hover:bg-gray-700"
          >
            <FontAwesomeIcon
              className="text-xs mr-2 text-gray-400"
              icon={TYPES[t.type]}
            />
            <div className="flex-1 flex items-center">
              {["start", "end"].map((i) => (
                <div key={i} className="flex items-center">
                  {t[i].countryCode && (
                    <span className="mr-2 flex-shrink-0">
                      {emoji(t[i].countryCode)}
                    </span>
                  )}
                  <span className="flex-1">{t[i].name}</span>
                  {i === "start" && (
                    <FontAwesomeIcon
                      className="text-xs mx-2 text-gray-500"
                      icon={faAngleRight}
                    />
                  )}
                </div>
              ))}
            </div>
            <span
              onClick={() => onRemove(t)}
              className="group-hover:visible invisible text-xs"
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Travels;
