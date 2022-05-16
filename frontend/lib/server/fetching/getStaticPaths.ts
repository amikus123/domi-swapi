import { getApiUrl } from "../../api"
import qs from "qs"

interface ParamsWrap {
  params: { slug: string; category: string }
}

export const geStaticBlogPaths = async (): Promise<ParamsWrap[]> => {
  const queryString = qs.stringify(
    {      pagination: {
      page: 1,
      pageSize: 40,
    },
      populate: ["blogCategories"],
    },
    {
      encodeValuesOnly: false,
    }
  )

  const raw = await fetch(`${getApiUrl()}/api/blogs/?${queryString}`)
  const parsed = await raw.json()

  const paths: ParamsWrap[] = []
  // * to each blog post we generate paths based on categories
  // * for example if post has two categories, it generates 2 paths.
  parsed.data.forEach((article) => {
    const { slug, blogCategories } = article.attributes
    const listOfCategories = blogCategories.data
    listOfCategories.forEach((list) => {
      const { slug: category } = list.attributes
      paths.push({
        params: {
          slug,
          category,
        },
      })
    })
  })
  return paths
}

export const getStaticCategories = async () => {
  const queryString = qs.stringify(
    {      pagination: {
      page: 1,
      pageSize: 40,
    },},

    {
      encodeValuesOnly: false,
    }
  )

  const raw = await fetch(`${getApiUrl()}/api/blog-categories/?${queryString}`)
  const parsed = await raw.json()

  return parsed
}
