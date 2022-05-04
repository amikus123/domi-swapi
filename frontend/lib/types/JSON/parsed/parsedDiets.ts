import { DietDay } from "../../dietPage/dietTypes";
import { DishReplacement } from "../../dietPage/dishTypes";
import { StrapiImage, ImageRaw } from "../../generalTypes";


export interface ParsedFullDiet extends  ParsedDiet{
  days: DietDay[]
  dishReplacements: Record<string, DishReplacement>
}

export interface ParsedDiet {
  id: number
  name: string
  dietImage: StrapiImage
  dietDescription: string
}

export interface DietJsonInitial {
    data: DietJson[]
  }
  export interface DietJson {
    id: number
    attributes: {
      name: string
      dietImage: ImageRaw
      dietDescription: string
    }
  }
  