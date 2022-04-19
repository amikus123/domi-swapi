import { atom } from "recoil"
import { UserIds } from "../../../../lib/types/dietPage/userTypes"

export const userIdsState = atom({
  key: "userIds",
  default: {userDataId:0,userId:0} as UserIds,
})
