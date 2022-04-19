import { atom } from "recoil";
import { DishPreference } from "../../../../lib/types/dietPage/dishTypes";

export const dishPreferencesState = atom({
    key: "dishPreferencesState",
    default: {} as   Record<string, DishPreference>,
  });