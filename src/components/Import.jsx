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
      className="cursor-pointer icon-button h-9 w-9 focus-within:ring-2 focus-within:ring-sky-500"
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
