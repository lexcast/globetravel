import React from "react";
import emoji from "react-easy-emoji";
import { countryCodeEmoji } from "country-code-emoji";

const Countries = ({ countries }) => {
  return (
    <div className="flex flex-wrap mb-6">
      {countries.map((c) => (
        <div key={c}>{emoji(countryCodeEmoji(c))}</div>
      ))}
    </div>
  );
};

export default Countries;
