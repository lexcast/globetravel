import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitch = ({ theme, setTheme }) => {
  const dark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative flex h-8 w-14 shrink-0 items-center rounded-full bg-slate-900/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-white/10"
    >
      <span
        className={
          "absolute left-1 flex h-6 w-6 items-center justify-center rounded-full text-xs shadow-md transition-transform duration-300 " +
          (dark
            ? "translate-x-6 bg-slate-800 text-sky-300"
            : "translate-x-0 bg-white text-amber-500")
        }
      >
        <FontAwesomeIcon icon={dark ? faMoon : faSun} />
      </span>
    </button>
  );
};

export default ThemeSwitch;
