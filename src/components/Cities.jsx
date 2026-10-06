import emoji from "../utils/emoji";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import RemoveButton from "./RemoveButton";
import ToggleButton from "./ToggleButton";

const Cities = ({ cities, onRemove, setHide, hide }) => {
  return (
    <>
      <span className="text-xs font-medium mb-1 mt-2 flex items-center justify-between">
        <span>
          CITIES <span className="text-gray-400">({cities.length})</span>
        </span>
        <ToggleButton
          label="Hide cities on the globe"
          pressed={hide}
          onClick={() => setHide(!hide)}
          icon={!hide ? faEye : faEyeSlash}
        />
      </span>
      <ul className="text-xs max-h-24 bg-gray-800 rounded-lg overflow-y-auto">
        {[...cities].reverse().map((c) => (
          <li
            key={c.geonameId}
            className="group px-3 py-1 min-h-8 flex items-center hover:bg-gray-700"
          >
            {c.countryCode && (
              <span className="mr-2 shrink-0">{emoji(c.countryCode)}</span>
            )}
            <span className="flex-1">{c.name}</span>
            <RemoveButton label={`Remove ${c.name}`} onClick={() => onRemove(c)} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cities;
