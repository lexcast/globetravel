import React from "react";
import emoji from "utils/emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Cities = ({ cities, onRemove }) => {
  return (
    <>
      <span className="text-xs font-medium mb-1 mt-2">
        CITIES <span className="text-gray-400">({cities.length})</span>
      </span>
      <div className="max-h-24 bg-gray-800 rounded-lg overflow-y-auto">
        {cities.map((c) => (
          <div
            onClick={() => onRemove(c.geonameId)}
            key={c.geonameId}
            className="group cursor-pointer px-3 py-1 flex items-center hover:bg-gray-700"
          >
            {c.countryCode && (
              <span className="mr-2">{emoji(c.countryCode)}</span>
            )}
            <span className="flex-1">{c.name}</span>
            <span className="group-hover:visible invisible text-xs">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cities;
