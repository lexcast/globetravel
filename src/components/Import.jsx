import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { parseImport } from "../utils/data";

const Import = ({ setCities, setTravels }) => {
  const handleFile = async (e) => {
    const input = e.target;
    const [file] = input.files;
    // Reset so selecting the same file again still triggers onChange.
    input.value = "";
    if (!file) return;

    try {
      const { cities, travels } = parseImport(await file.text());
      setCities(cities);
      setTravels(travels);
    } catch (error) {
      window.alert(`Could not import the file. ${error.message}`);
    }
  };

  return (
    <label
      title="Import"
      className="cursor-pointer flex items-center justify-center focus-within:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700"
    >
      <input
        className="sr-only"
        type="file"
        aria-label="Import"
        accept=".json,application/json"
        onChange={handleFile}
      />
      <FontAwesomeIcon icon={faUpload} />
    </label>
  );
};

export default Import;
