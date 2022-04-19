import { DietDay } from "../../dietPage/dietTypes";
import { DishReplacement } from "../../dietPage/dishTypes";

export interface DietFullJsonInitial {
  data: DietFullJson[]
}
export interface DietFullJson {
  id: number
  attributes: {
    name: string
    dietImage: any
    dietDescription: string
  }
}
export interface ParsedFullDiet {
  id: number
  name: string
  dietImage: any
  dietDescription: string
  days: DietDay[]
  dishReplacements: Record<string, DishReplacement>
}

export interface ParsedDiet {
  id: number
  name: string
  dietImage: any
  dietDescription: string
}

export interface DietJsonInitial {
    data: DietJson[]
  }
  export interface DietJson {
    id: number
    attributes: {
      name: string
      dietImage: any
      dietDescription: string
    }
  }
  