import { atom } from "recoil"

export const isPublicState = atom({
  key: "isPublicState",
  default: false as boolean,
})
