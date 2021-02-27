import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Export = ({ cities, travels, countries }) => (
  <a
    className="flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700"
    href={`data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ cities, travels, countries }, null, 2)
    )}`}
    download="globetravel.json"
  >
    <FontAwesomeIcon icon={faDownload} />
  </a>
);

export default Export;
