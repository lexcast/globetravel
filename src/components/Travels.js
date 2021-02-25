import React from "react";
import emoji from "react-easy-emoji";
import { countryCodeEmoji } from "country-code-emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlane,
  faTrain,
  faShip,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const TYPES = { flight: faPlane, trail: faTrain, sail: faShip };

const Travels = ({ travels, onRemove }) => {
  return (
    <>
      <span className="text-xs font-medium mb-1 mt-2">
        TRAVELS <span className="text-gray-400">({travels.length})</span>
      </span>
      <div className="max-h-24 bg-gray-800 rounded-lg overflow-y-auto">
        {travels.map((t) => (
          <div
            onClick={() => onRemove(t.id)}
            key={t.id}
            className="group cursor-pointer px-3 py-1 flex items-center hover:bg-gray-700"
          >
            <FontAwesomeIcon
              className="text-xs mr-2 text-gray-400"
              icon={TYPES[t.type]}
            />
            <div className="flex-1 flex items-center">
              {["start", "end"].map((i) => (
                <div key={i} className="flex items-center">
                  {t[i].countryCode && (
                    <span className="mr-2">
                      {emoji(countryCodeEmoji(t[i].countryCode))}
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
            <span className="group-hover:visible invisible text-xs">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Travels;
