import emoji from "../utils/emoji";
import TRAVEL_TYPES from "../utils/travelTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faArrowRight,
  faEye,
  faEyeSlash,
  faPlaneSlash,
} from "@fortawesome/free-solid-svg-icons";
import RemoveButton from "./RemoveButton";
import ToggleButton from "./ToggleButton";
import SectionHeader from "./SectionHeader";

const Place = ({ city }) => (
  <span className="flex min-w-0 items-center">
    {city.countryCode && (
      <span className="mr-1.5 shrink-0">{emoji(city.countryCode)}</span>
    )}
    <span className="truncate">{city.name}</span>
  </span>
);

const Travels = ({
  travels,
  onRemove,
  hide,
  setHide,
  hideFlights,
  setHideFlights,
}) => (
  <section>
    <SectionHeader title="Travels" count={travels.length}>
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
    </SectionHeader>
    <ul className="card max-h-72 overflow-y-auto p-1 text-sm">
      {[...travels].reverse().map((t) => {
        const { icon, label, color } = TRAVEL_TYPES[t.type];

        return (
          <li
            key={t.id}
            className="group flex min-h-10 items-center rounded-xl px-2 py-1 transition-colors hover:bg-slate-900/5 dark:hover:bg-white/5"
          >
            <span
              className="mr-2.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs"
              style={{ color, backgroundColor: `${color}1f` }}
            >
              <FontAwesomeIcon icon={icon} title={label} />
            </span>
            <span className="flex min-w-0 flex-1 items-center">
              <Place city={t.start} />
              <FontAwesomeIcon
                className="mx-2 shrink-0 text-[10px] text-slate-400 dark:text-slate-500"
                icon={faArrowRight}
              />
              <Place city={t.end} />
            </span>
            <RemoveButton
              label={`Remove travel ${t.start.name} to ${t.end.name}`}
              onClick={() => onRemove(t)}
            />
          </li>
        );
      })}
    </ul>
  </section>
);

export default Travels;
