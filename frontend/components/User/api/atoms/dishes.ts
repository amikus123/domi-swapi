import { atom } from "recoil";
import { Dish } from "../../../../lib/types/dietPage/dishTypes";

export const dishesState = atom({
    key: "dishesState",
    default: {} as  Record<string, Dish>
  });