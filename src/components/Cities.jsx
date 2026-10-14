import emoji from "../utils/emoji";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import RemoveButton from "./RemoveButton";
import ToggleButton from "./ToggleButton";
import SectionHeader from "./SectionHeader";

const Cities = ({ cities, onRemove, setHide, hide }) => (
  <section>
    <SectionHeader title="Cities" count={cities.length}>
      <ToggleButton
        label="Hide cities on the globe"
        pressed={hide}
        onClick={() => setHide(!hide)}
        icon={!hide ? faEye : faEyeSlash}
      />
    </SectionHeader>
    <ul className="card max-h-56 overflow-y-auto p-1 text-sm">
      {[...cities].reverse().map((c) => (
        <li
          key={c.geonameId}
          className="group flex min-h-10 items-center rounded-xl px-3 py-1 transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5"
        >
          {c.countryCode && (
            <span className="mr-2.5 shrink-0">{emoji(c.countryCode)}</span>
          )}
          <span className="min-w-0 flex-1 truncate">
            {c.name}
            {c.adminName1 && (
              <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">
                {c.adminName1}
              </span>
            )}
          </span>
          <RemoveButton label={`Remove ${c.name}`} onClick={() => onRemove(c)} />
        </li>
      ))}
    </ul>
  </section>
);

export default Cities;
