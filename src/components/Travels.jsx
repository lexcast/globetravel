import emoji from "../utils/emoji";
import TRAVEL_TYPES from "../utils/travelTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faAngleRight,
  faEye,
  faEyeSlash,
  faPlaneSlash,
} from "@fortawesome/free-solid-svg-icons";
import RemoveButton from "./RemoveButton";
import ToggleButton from "./ToggleButton";

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
        <div className="flex items-center gap-2">
          <ToggleButton
            label="Hide flights on the globe"
            pressed={hideFlights}
            onClick={() => setHideFlights(!hideFlights)}
            icon={!hideFlights ? faPlane : faPlaneSlash}
          />
          <ToggleButton
            label="Hide ground travels on the globe"
            pressed={hide}
            onClick={() => setHide(!hide)}
            icon={!hide ? faEye : faEyeSlash}
          />
        </div>
      </span>
      <ul className="text-xs max-h-24 bg-gray-800 rounded-lg overflow-y-auto">
        {[...travels].reverse().map((t) => (
          <li
            key={t.id}
            className="group px-3 py-1 min-h-8 flex items-center hover:bg-gray-700"
          >
            <FontAwesomeIcon
              className="text-xs mr-2 text-gray-400"
              icon={TRAVEL_TYPES[t.type].icon}
              title={TRAVEL_TYPES[t.type].label}
            />
            <div className="flex-1 flex items-center">
              {["start", "end"].map((i) => (
                <div key={i} className="flex items-center">
                  {t[i].countryCode && (
                    <span className="mr-2 shrink-0">
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
            <RemoveButton
              label={`Remove travel ${t.start.name} to ${t.end.name}`}
              onClick={() => onRemove(t)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Travels;
