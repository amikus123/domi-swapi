import { atom } from "recoil";
import { DishPreference } from "../types";

export const dishPreferencesState = atom({
    key: "dishPreferencesState",
    default: {} as   Record<string, DishPreference>,
  });