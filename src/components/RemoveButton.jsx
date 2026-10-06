import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Always visible on touch screens; on mouse devices it shows on row hover/focus.
const RemoveButton = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="ml-2 shrink-0 flex items-center justify-center h-6 w-6 rounded-full text-xs hover:bg-gray-600 focus:outline-none focus-visible:ring pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-within:opacity-100"
  >
    <FontAwesomeIcon icon={faTimes} />
  </button>
);

export default RemoveButton;
