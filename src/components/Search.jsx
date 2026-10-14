import { useEffect, useState, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchPlaces } from "../utils/geonames";
import emoji from "../utils/emoji";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MIN_LENGTH = 2;

const Search = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState({ query: null, results: [] });
  const query = useDebounce(search.trim(), 300);
  const el = useRef();

  useEffect(() => {
    if (query.length < MIN_LENGTH) return;

    const controller = new AbortController();
    searchPlaces(query, controller.signal)
      .then((results) => setResponse({ query, results }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error(error);
        setResponse({ query, results: [], error: true });
      });

    return () => controller.abort();
  }, [query]);

  const active = search.trim().length >= MIN_LENGTH;
  const loading = active && (search.trim() !== query || response.query !== query);

  let content = null;
  if (active && loading) {
    content = <p className="px-4 py-3 text-slate-500 dark:text-slate-400">Searching…</p>;
  } else if (active && response.error) {
    content = (
      <p className="px-4 py-3 text-red-600 dark:text-red-400">
        Search is not available right now, try again later.
      </p>
    );
  } else if (active && response.results.length === 0) {
    content = <p className="px-4 py-3 text-slate-500 dark:text-slate-400">No places found.</p>;
  } else if (active) {
    content = (
      <ul className="p-1">
        {response.results.map((r) => (
          <li key={r.geonameId}>
            <button
              type="button"
              onClick={() => {
                onSelect(r);
                setSearch("");
                el.current.focus();
              }}
              className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2 text-left hover:bg-slate-900/5 focus:bg-slate-900/5 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
              {r.countryCode && (
                <span className="mr-2">{emoji(r.countryCode)}</span>
              )}
              <span className="flex-1">{r.name}</span>
              {r.adminName1 && (
                <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                  {r.adminName1}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="relative flex flex-col justify-center">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="pointer-events-none absolute top-3.5 left-4 text-sm text-slate-400"
      />
      <input
        ref={el}
        autoFocus
        type="search"
        aria-label="Search a place"
        value={search}
        placeholder="Search any place..."
        className="h-11 w-full rounded-2xl border border-slate-200 bg-white pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15 focus:outline-none dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-500"
        onChange={(e) => setSearch(e.target.value)}
      />
      {content && (
        <div
          aria-live="polite"
          className="absolute top-11 right-0 left-0 z-10 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm shadow-xl dark:border-white/10 dark:bg-slate-800"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Search;
