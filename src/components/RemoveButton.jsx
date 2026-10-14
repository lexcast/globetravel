import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Always visible on touch screens; on mouse devices it shows on row hover/focus.
const RemoveButton = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="icon-button ml-2 h-7 w-7 shrink-0 text-xs hover:text-red-500 pointer-fine:opacity-0 pointer-fine:group-focus-within:opacity-100 pointer-fine:group-hover:opacity-100 dark:hover:text-red-400"
  >
    <FontAwesomeIcon icon={faTimes} />
  </button>
);

export default RemoveButton;
