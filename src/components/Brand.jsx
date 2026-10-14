import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

const Brand = () => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-indigo-500 text-lg text-white shadow-lg shadow-sky-500/30">
      <FontAwesomeIcon icon={faEarthAmericas} />
    </div>
    <div className="leading-tight">
      <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        Globetravel
      </h1>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Your trips around the world
      </p>
    </div>
  </div>
);

export default Brand;
