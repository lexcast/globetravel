import emoji from "../utils/emoji";
import { withUKFlag } from "../utils/data";

const Countries = ({ countries }) => (
  <div className="flex flex-wrap mb-6">
    {withUKFlag(countries).map((c) => (
      <div key={c}>{emoji(c)}</div>
    ))}
  </div>
);

export default Countries;
