import React, { useState } from "react";
import Search from "./Search";
import emoji from "react-easy-emoji";
import { countryCodeEmoji } from "country-code-emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShip,
  faPlane,
  faTrain,
  faBus,
} from "@fortawesome/free-solid-svg-icons";

const TYPES = { flight: faPlane, trail: faTrain, sail: faShip, bus: faBus };

const Travel = ({ onFinish }) => {
  const [type, setType] = useState();
  const [start, setStart] = useState();

  return (
    <div className="flex flex-col justify-center">
      {!type && (
        <div className="flex items-center justify-around">
          {Object.entries(TYPES).map(([k, icon]) => (
            <div
              key={k}
              onClick={() => setType(k)}
              className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-800 cursor-pointer hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={icon} />
            </div>
          ))}
        </div>
      )}
      {!!type && !start && (
        <>
          <div className="flex items-center mb-2">
            <div className="text-xs mr-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800">
              <FontAwesomeIcon icon={TYPES[type]} />
            </div>
            From:
          </div>
          <Search onSelect={(c) => setStart(c)} />
        </>
      )}
      {!!type && !!start && (
        <>
          <div className="flex items-center mb-2">
            <div className="mr-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800">
              <FontAwesomeIcon icon={TYPES[type]} />
            </div>
            <div className="flex items-center mr-2">
              {start.countryCode && (
                <span className="mr-2">
                  {emoji(countryCodeEmoji(start.countryCode))}
                </span>
              )}
              <span>{start.name}</span>
            </div>
            To:
          </div>
          <Search
            onSelect={(c) => {
              onFinish(type, start, c);
              setType();
              setStart();
            }}
          />
        </>
      )}
    </div>
  );
};

export default Travel;
