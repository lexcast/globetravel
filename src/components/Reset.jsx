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
      className="icon-button h-9 w-9 hover:text-red-500 dark:hover:text-red-400"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default Reset;
