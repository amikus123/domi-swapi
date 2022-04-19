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
  