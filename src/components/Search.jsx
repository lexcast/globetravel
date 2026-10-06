import { useEffect, useState, useRef } from "react";
import useDebounce from "../hooks/useDebounce";
import { searchPlaces } from "../utils/geonames";
import emoji from "../utils/emoji";

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
    content = <p className="px-3 py-2 text-gray-400">Searching…</p>;
  } else if (active && response.error) {
    content = (
      <p className="px-3 py-2 text-red-400">
        Search is not available right now, try again later.
      </p>
    );
  } else if (active && response.results.length === 0) {
    content = <p className="px-3 py-2 text-gray-400">No places found.</p>;
  } else if (active) {
    content = (
      <ul>
        {response.results.map((r) => (
          <li key={r.geonameId}>
            <button
              type="button"
              onClick={() => {
                onSelect(r);
                setSearch("");
                el.current.focus();
              }}
              className="w-full text-left cursor-pointer px-3 py-2 flex items-center hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
            >
              {r.countryCode && (
                <span className="mr-2">{emoji(r.countryCode)}</span>
              )}
              <span className="flex-1">{r.name}</span>
              {r.adminName1 && (
                <span className="ml-2 text-xs text-gray-400">
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
    <div className="flex flex-col justify-center relative">
      <input
        ref={el}
        autoFocus
        type="search"
        aria-label="Search a place"
        value={search}
        placeholder="Search any place..."
        className="flex items-center h-10 px-3 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring"
        onChange={(e) => setSearch(e.target.value)}
      />
      {content && (
        <div
          aria-live="polite"
          className="top-10 ring left-0 right-0 absolute mt-4 rounded-lg bg-gray-800 overflow-hidden text-sm z-10"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Search;
