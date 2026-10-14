import emoji from "../utils/emoji";
import { withUKFlag } from "../utils/data";

const Countries = ({ countries }) => (
  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xl">
    {withUKFlag(countries).map((c) => (
      <span key={c} title={c}>
        {emoji(c)}
      </span>
    ))}
  </div>
);

export default Countries;
