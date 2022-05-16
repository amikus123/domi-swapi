import { getApiUrl } from "../../api"
import { BlogPost, BlogCardFull } from "../../types/JSON/parsed/parsedBlogs"
import { handleBlogPost, handleBlogsById } from "../jsonParsers/parseBlog"

import { handleBlogIds } from "../jsonParsers/parseBlogIds"
import qs from "qs"
import {
  BlogCategoriesWrapJson,
  BlogFullCardWrapJson,
  BlogWrapJson,
} from "../../types/JSON/raw/blogJsonTypes"

export const getBlogCardDataByIds = async (
  ids: string[]
): Promise<BlogCardFull[]> => {
  const queryString = qs.stringify(
    {
      populate: [
        "mainImage",
        "mainImage.image",
        "blogCategories",
        "cardData",
        "cardData.image",
      ],
      pagination: {
        page: 1,
        pageSize: 40,
      },
      filters: {
        ID: {
          $in: ids,
        },
      },
    },

    {
      encodeValuesOnly: true,
    }
  )

  const request = await fetch(`${getApiUrl()}/api/blogs?${queryString}`, {})
  const rawJSON = (await request.json()) as BlogFullCardWrapJson
  const data = handleBlogsById(rawJSON)
  return data
}

export const getIdsOfBlogs = async (): Promise<Record<number, boolean>> => {
  const postQuery = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 40,
      },
    },

    {
      encodeValuesOnly: true,
    }
  )
  const dishRequest = await fetch(`${getApiUrl()}/api/blogs?${postQuery}`, {})
  const rawJSON = (await dishRequest.json()) as BlogCategoriesWrapJson
  const data = handleBlogIds(rawJSON)
  return data
}

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const queryString = qs.stringify(
    {
      populate: [
        "content",
        "content.image",
        "mainImage",
        "mainImage.image",
        "blogCategories",
        "cardData",
        "cardData.image",
      ],
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )
  const request = await fetch(`${getApiUrl()}/api/blogs?${queryString}`, {})
  const rawJSON = (await request.json()) as BlogWrapJson
  const data = handleBlogPost(rawJSON)
  return data
}

export const getBlogCardDatas = async (): Promise<BlogCardFull[]> => {
  const queryString = qs.stringify(
    {
      populate: [
        "mainImage",
        "mainImage.image",
        "blogCategories",
        "cardData",
        "cardData.image",
      ],
      pagination: {
        page: 1,
        pageSize: 3,
      },
      filters: {},
    },

    {
      encodeValuesOnly: true,
    }
  )

  const request = await fetch(`${getApiUrl()}/api/blogs?${queryString}`, {})
  const rawJSON = (await request.json()) as BlogFullCardWrapJson
  const data = handleBlogsById(rawJSON)
  return data
}
