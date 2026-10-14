import emoji from "../utils/emoji";

const linkClass =
  "text-sky-600 hover:underline dark:text-sky-400";

const Footer = () => (
  <div className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
    <div className="flex items-center">
      Made by<span className="mx-1">{emoji("MX")}</span>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        href="https://github.com/lexcast"
      >
        Daniel Alejandro Cast
      </a>
    </div>
    <div>
      Uses{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        href="https://www.geonames.org/"
      >
        Geonames API
      </a>
    </div>
  </div>
);

export default Footer;
