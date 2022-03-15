import { atom } from "recoil";
import { Dish } from "../types";

export const dishesState = atom({
    key: 'dishesState',
    default: {} as  Record<string, Dish>
  });