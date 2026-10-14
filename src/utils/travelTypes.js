import {
  faShip,
  faPlane,
  faTrain,
  faBus,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

// "trail" is kept as the train key for compatibility with saved data.
const TRAVEL_TYPES = {
  flight: { label: "Flight", icon: faPlane, color: "#f43f5e" },
  trail: { label: "Train", icon: faTrain, color: "#10b981" },
  sail: { label: "Boat", icon: faShip, color: "#3b82f6" },
  bus: { label: "Bus", icon: faBus, color: "#a855f7" },
  car: { label: "Car", icon: faCar, color: "#f59e0b" },
};

export default TRAVEL_TYPES;
