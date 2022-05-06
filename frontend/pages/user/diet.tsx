import React from "react"
import { parseCookies } from "nookies"
import { getDishes } from "../../lib/server/fetching/getDishes"
import { getUser } from "../../lib/server/fetching/getUser"
import { Diet } from "../../lib/types/dietPage/dietTypes"
import { Dish } from "../../lib/types/dietPage/dishTypes"
import { UserFullData } from "../../lib/types/dietPage/userTypes"
import DietControl from "../../components/DietControl/DietControl"

interface DietProps {
  user: UserFullData
  originalDishes: Record<string, Dish>
  isPagePublic?: boolean
  diet: Diet
}

const DietComponent = ({
  user,
  originalDishes,
  isPagePublic = false,
  diet,
}: DietProps) => {
  return (
    <DietControl
      diet={diet}
      originalDishes={originalDishes}
      isPagePublic={isPagePublic}
      user={user}
    />
  )
}

export default DietComponent

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt
  const user = await getUser(jwt)
  const dishes = await getDishes(user, jwt)
  const diet = user.userDiet.diet
  return {
    props: { user, originalDishes: dishes, diet },
  }
}
