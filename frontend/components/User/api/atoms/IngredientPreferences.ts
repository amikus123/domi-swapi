import { atom } from "recoil";
import { IngredientPreference } from "../types";

export const ingredientPreferencesState = atom({
    key: 'ingredientPreferencesState',
    default: {} as   Record<string, IngredientPreference>,
  });