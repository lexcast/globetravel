import emoji from "react-easy-emoji";
import { countryCodeEmoji } from "country-code-emoji";

const countryEmoji = (country) => emoji(countryCodeEmoji(country));

export default countryEmoji;
