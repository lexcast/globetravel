import emoji from "react-easy-emoji";
import { countryCodeEmoji } from "country-code-emoji";

const SPECIAL_CODES_FLAGS = { ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", SCT: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", WLS: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" };

export const SPECIAL_CODES = Object.keys(SPECIAL_CODES_FLAGS);

const countryEmoji = (country) =>
  SPECIAL_CODES.includes(country)
    ? emoji(SPECIAL_CODES_FLAGS[country])
    : emoji(countryCodeEmoji(country));

export default countryEmoji;
