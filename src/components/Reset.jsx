import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Reset = ({ setCities, setTravels }) => {
  const handleReset = () => {
    if (window.confirm("Do you really want to delete everything?")) {
      setCities([]);
      setTravels([]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      title="Reset"
      aria-label="Reset"
      className="flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default Reset;
