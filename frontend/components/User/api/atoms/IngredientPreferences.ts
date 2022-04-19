import { atom } from "recoil";
import { IngredientPreference } from "../../../../lib/types/dietPage/userTypes";

export const ingredientPreferencesState = atom({
    key: "ingredientPreferencesState",
    default: {} as   Record<string, IngredientPreference>,
  });