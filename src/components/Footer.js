import React from "react";
import emoji from "utils/emoji";

const Footer = () => (
  <>
    <div className="justify-end flex items-center mt-4 mb-1 text-gray-400 text-xs">
      Made by<span className="mx-1">{emoji("MX")}</span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400"
        href="https://github.com/lexcast"
      >
        Daniel Alejandro Cast
      </a>
    </div>
    <div className="text-right text-gray-400 text-xs">
      Globetravel uses{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400"
        href="https://www.geonames.org/"
      >
        Geonames API
      </a>
    </div>
  </>
);

export default Footer;
