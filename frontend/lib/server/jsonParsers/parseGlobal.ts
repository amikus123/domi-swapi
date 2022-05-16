import { ImageRaw, GenericMetaData } from "../../types/generalTypes"
import { handleImage } from "./parseImage"

const expample: XD = {
  data: {
    id: 1,
    attributes: {
      favicon: {
        data: {
          id: 34,
          attributes: {
            name: "hero.jpg",
            alternativeText: "hero.jpg",
            caption: "hero.jpg",
            width: 1814,
            height: 1814,
            formats: {
              thumbnail: {
                name: "thumbnail_hero.jpg",
                hash: "thumbnail_hero_180a984a73",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 156,
                height: 156,
                size: 7.12,
                path: null,
                url: "https://res.cloudinary.com/drezdvfxi/image/upload/v1652709603/thumbnail_hero_180a984a73.jpg",
                provider_metadata: {
                  public_id: "thumbnail_hero_180a984a73",
                  resource_type: "image",
                },
              },
              large: {
                name: "large_hero.jpg",
                hash: "large_hero_180a984a73",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 1000,
                height: 1000,
                size: 134.5,
                path: null,
                url: "https://res.cloudinary.com/drezdvfxi/image/upload/v1652709605/large_hero_180a984a73.jpg",
                provider_metadata: {
                  public_id: "large_hero_180a984a73",
                  resource_type: "image",
                },
              },
              medium: {
                name: "medium_hero.jpg",
                hash: "medium_hero_180a984a73",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 750,
                height: 750,
                size: 80.5,
                path: null,
                url: "https://res.cloudinary.com/drezdvfxi/image/upload/v1652709606/medium_hero_180a984a73.jpg",
                provider_metadata: {
                  public_id: "medium_hero_180a984a73",
                  resource_type: "image",
                },
              },
              small: {
                name: "small_hero.jpg",
                hash: "small_hero_180a984a73",
                ext: ".jpg",
                mime: "image/jpeg",
                width: 500,
                height: 500,
                size: 42.16,
                path: null,
                url: "https://res.cloudinary.com/drezdvfxi/image/upload/v1652709607/small_hero_180a984a73.jpg",
                provider_metadata: {
                  public_id: "small_hero_180a984a73",
                  resource_type: "image",
                },
              },
            },
            hash: "hero_180a984a73",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 424.12,
            url: "https://res.cloudinary.com/drezdvfxi/image/upload/v1652709601/hero_180a984a73.jpg",
            previewUrl: null,
            provider: "cloudinary",
            provider_metadata: {
              public_id: "hero_180a984a73",
              resource_type: "image",
            },
            createdAt: "2022-05-16T14:00:07.634Z",
            updatedAt: "2022-05-16T14:00:07.634Z",
          },
        },
      },
    },
  },
  meta: {},
}

export const parseGlobalImage = (raw: XD) => {
  console.log(raw,"asddsasad")
  return handleImage(raw.data.attributes.favicon)
}

interface XD {
  data: {
    id: number
    attributes: {
      favicon: any
    }
  }
  meta: GenericMetaData
}
