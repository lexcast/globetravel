import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToggleButton = ({ label, pressed, onClick, icon }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    aria-pressed={pressed}
    title={label}
    className={"icon-button h-7 w-7 text-xs " + (pressed ? "opacity-50" : "")}
  >
    <FontAwesomeIcon icon={icon} />
  </button>
);

export default ToggleButton;
