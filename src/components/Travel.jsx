import { useState } from "react";
import Search from "./Search";
import emoji from "../utils/emoji";
import TRAVEL_TYPES from "../utils/travelTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Travel = ({ onFinish }) => {
  const [type, setType] = useState();
  const [start, setStart] = useState();

  return (
    <div className="flex flex-col justify-center">
      {!type && (
        <div className="flex items-center justify-around">
          {Object.entries(TRAVEL_TYPES).map(([k, { icon, label }]) => (
            <button
              type="button"
              key={k}
              onClick={() => setType(k)}
              aria-label={label}
              title={label}
              className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring"
            >
              <FontAwesomeIcon icon={icon} />
            </button>
          ))}
        </div>
      )}
      {!!type && !start && (
        <>
          <div className="flex items-center mb-2">
            <div className="text-xs mr-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800">
              <FontAwesomeIcon icon={TRAVEL_TYPES[type].icon} />
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
              <FontAwesomeIcon icon={TRAVEL_TYPES[type].icon} />
            </div>
            <div className="flex items-center mr-2">
              {start.countryCode && (
                <span className="mr-2">{emoji(start.countryCode)}</span>
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
