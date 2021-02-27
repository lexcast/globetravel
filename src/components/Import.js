import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const Import = ({ setCities, setTravels, setCountries }) => {
  const handleFile = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setCities(data.cities);
      setTravels(data.travels);
      setCountries(data.countries);
    };
  };

  return (
    <label className="flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700">
      <input
        className="hidden"
        type="file"
        accept="application/JSON"
        onChange={handleFile}
      />
      <FontAwesomeIcon icon={faUpload} />
    </label>
  );
};

export default Import;
