import {
  faShip,
  faPlane,
  faTrain,
  faBus,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

// "trail" is kept as the train key for compatibility with saved data.
const TRAVEL_TYPES = {
  flight: { label: "Flight", icon: faPlane, color: "#dc2626" },
  trail: { label: "Train", icon: faTrain, color: "#34d399" },
  sail: { label: "Boat", icon: faShip, color: "#3b82f6" },
  bus: { label: "Bus", icon: faBus, color: "#f472b6" },
  car: { label: "Car", icon: faCar, color: "#fb923c" },
};

export default TRAVEL_TYPES;
