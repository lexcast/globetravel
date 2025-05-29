import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Import = ({ setCities, setTravels, setCountries }) => {
  const handleReset = () => {
    if (window.confirm("Do you really want to delete everything?")) {
      setCities([]);
      setTravels([]);
      setCountries([]);
    }
  };

  return (
    <button
      onClick={handleReset}
      title="Reset"
      className="flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default Import;
