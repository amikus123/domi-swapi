export interface NameAmount {
  name: string
  amount: string
}

interface BaseImageData {
  size: number
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  url: string
}
export interface FormatImage extends BaseImageData {
  path: null | string
}
export interface StrapiImage extends BaseImageData {
  alternativeText: string
  caption: string
  previewUrl: null | string
  provider: string
  provider_metadata: null | string
  createdAt: string
  updatedAt: string
  formats: Record<string, FormatImage>
}

export interface ImageRaw {
  data: {
    id: number
    attributes: StrapiImage
  }
}

export interface GenericMetaData {
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}


