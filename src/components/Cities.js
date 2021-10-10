import React from "react";
import emoji from "utils/emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Cities = ({ cities, onRemove, setHide, hide }) => {
  return (
    <>
      <span className="text-xs font-medium mb-1 mt-2 flex items-center justify-between">
        <span>
          CITIES <span className="text-gray-400">({cities.length})</span>
        </span>
        <div
          onClick={() => setHide(!hide)}
          className="flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 cursor-pointer hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={!hide ? faEye : faEyeSlash} />
        </div>
      </span>
      <div className="text-xs max-h-24 bg-gray-800 rounded-lg overflow-y-auto">
        {cities.map((c) => (
          <div
            key={c.geonameId}
            className="group px-3 py-2 flex items-center hover:bg-gray-700"
          >
            {c.countryCode && (
              <span className="mr-2 flex-shrink-0">{emoji(c.countryCode)}</span>
            )}
            <span className="flex-1">{c.name}</span>
            <span
              onClick={() => onRemove(c)}
              className="cursor-pointer group-hover:visible invisible text-xs"
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cities;
