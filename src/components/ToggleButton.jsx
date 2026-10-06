import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToggleButton = ({ label, pressed, onClick, icon }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={pressed}
    title={label}
    className="flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 hover:bg-gray-700 focus:outline-none focus-visible:ring"
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

export default ToggleButton;
