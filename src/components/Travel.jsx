import { useState } from "react";
import Search from "./Search";
import emoji from "../utils/emoji";
import TRAVEL_TYPES from "../utils/travelTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";

const Travel = ({ onFinish }) => {
  const [type, setType] = useState();
  const [start, setStart] = useState();

  if (!type) {
    return (
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(TRAVEL_TYPES).map(([k, { icon, label, color }]) => (
          <button
            type="button"
            key={k}
            onClick={() => setType(k)}
            className="card flex flex-col items-center gap-1.5 py-3 text-[11px] font-medium text-slate-600 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-300 dark:hover:bg-white/[0.07]"
          >
            <FontAwesomeIcon icon={icon} style={{ color }} className="text-base" />
            {label}
          </button>
        ))}
      </div>
    );
  }

  const { icon, label, color } = TRAVEL_TYPES[type];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs"
          style={{ color, backgroundColor: `${color}1f` }}
          title={label}
        >
          <FontAwesomeIcon icon={icon} />
        </span>
        {start ? (
          <>
            <span className="flex min-w-0 items-center font-medium">
              {start.countryCode && (
                <span className="mr-1.5">{emoji(start.countryCode)}</span>
              )}
              <span className="truncate">{start.name}</span>
            </span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs text-slate-400"
            />
            <span className="text-slate-500 dark:text-slate-400">To</span>
          </>
        ) : (
          <span className="text-slate-500 dark:text-slate-400">From</span>
        )}
        <button
          type="button"
          onClick={() => {
            setType();
            setStart();
          }}
          aria-label="Cancel travel"
          title="Cancel"
          className="icon-button ml-auto h-7 w-7 text-xs"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      {start ? (
        <Search
          key="end"
          onSelect={(c) => {
            onFinish(type, start, c);
            setType();
            setStart();
          }}
        />
      ) : (
        <Search key="start" onSelect={(c) => setStart(c)} />
      )}
    </div>
  );
};

export default Travel;
