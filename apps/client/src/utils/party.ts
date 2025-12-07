import { PARTY_THEMES } from "@/common/constants/party/theme";
import { PartyTheme } from "@/enum/party.enum";

export const partyThemeConverter = (theme: PartyTheme) => {
  switch (theme) {
    case PartyTheme.BIRTHDAY:
      return PARTY_THEMES[0];
    case PartyTheme.CHRISTMAS:
      return PARTY_THEMES[1];
    case PartyTheme.YEAR_END:
      return PARTY_THEMES[2];
    case PartyTheme.NEW_YEAR:
      return PARTY_THEMES[3];
    default:
      return PARTY_THEMES[0];
  }
};
