import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { DebounceInput } from "react-debounce-input";
import emoji from "react-easy-emoji";
import { countryCodeEmoji } from "country-code-emoji";

const Search = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const el = useRef();

  useEffect(() => el.current.focus(), []);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("http://api.geonames.org/search", {
          params: { username: "lexcast", maxRows: 5, q: search, type: "json" },
        });
        setResults(response.data.geonames);
      } catch (e) {
        setResults([]);
        console.error(e);
      }
    };
    if (search) {
      fetchApi();
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <div className="flex flex-col justify-center relative">
      <DebounceInput
        inputRef={el}
        minLength={2}
        value={search}
        debounceTimeout={300}
        placeholder="Search any place..."
        className="flex items-center h-10 px-3 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring"
        onChange={(e) => setSearch(e.target.value)}
      />
      {Array.isArray(results) && results.length > 0 && (
        <div className="top-10 ring left-0 right-0 absolute mt-4 rounded-lg bg-gray-800 overflow-hidden text-sm">
          {results.map((r) => (
            <div
              onClick={() => {
                onSelect(r);
                setResults([]);
                setSearch("");
                el.current.focus();
              }}
              key={r.geonameId}
              className="cursor-pointer px-3 py-2 flex items-center hover:bg-gray-700"
            >
              {r.countryCode && (
                <span className="mr-2">
                  {emoji(countryCodeEmoji(r.countryCode))}
                </span>
              )}
              <span className="flex-1">{r.name}</span>
              {r.adminName1 && (
                <span className="ml-2 text-xs text-gray-400">
                  {r.adminName1}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
