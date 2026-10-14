import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Export = ({ cities, travels, countries }) => (
  <a
    title="Export"
    className="icon-button h-9 w-9"
    href={`data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ cities, travels, countries }, null, 2)
    )}`}
    download="globetravel.json"
  >
    <FontAwesomeIcon icon={faDownload} />
  </a>
);

export default Export;
