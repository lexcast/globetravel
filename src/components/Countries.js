import React from "react";
import emoji from "utils/emoji";

const Countries = ({ countries }) => {
  return (
    <div className="flex flex-wrap mb-6">
      {countries.map((c) => (
        <div key={c}>{emoji(c)}</div>
      ))}
    </div>
  );
};

export default Countries;
