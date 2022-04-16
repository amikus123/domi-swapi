import { BlogDataJson } from "../JsonTypes/blogJsonTypes"
import { BlogPost, handleCardData, handleCategories } from "./parseBlog"

export type CategoryBlogPost = Omit<BlogPost, "content">

export const handleBlogCategoryPosts = (
  initial: BlogCategoryPostWrapJson
): CategoryBlogPost[] => {
  const blogs = initial.data[0].attributes.blogs.data
  const res: CategoryBlogPost[] = blogs.map((item) => {
    const {
      blogCategories,
      cardData,
      date,
      description,
      mainImage,
      readingTime,
      slug,
      title,
    } = item.attributes
    return {
      slug,
      title,
      readingTime,
      description,
      date,
      cardData: handleCardData(cardData),
      mainImage,
      blogCategories: handleCategories(blogCategories),
    }
  })

  return res
}

export type BlogCategoryPostData = Omit<BlogDataJson, "content">

interface BlogCategoryPostDataWrap {
  id: number
  attributes: BlogCategoryPostData
}

interface BlogCategoryPostAttributesJson {
  name: string
  slug: string
  description: string
  blogs: {
    data: BlogCategoryPostDataWrap[]
  }
}
interface BlogCategoryPostDataJson {
  id: number
  attributes: BlogCategoryPostAttributesJson
}
interface BlogCategoryPostWrapJson {
  data: BlogCategoryPostDataJson[]
  meta: any
}
const xd = {
  data: [
    {
      id: 3,
      attributes: {
        name: "Gotowanie",
        slug: "gotowanie",
        description: "adsadsad",
        createdAt: "2022-02-03T19:15:11.422Z",
        updatedAt: "2022-03-17T18:17:29.870Z",
        blogs: {
          data: [
            {
              id: 1,
              attributes: {
                createdAt: "2022-02-03T16:00:04.658Z",
                updatedAt: "2022-04-15T20:29:23.568Z",
                title:
                  "3 Morning Habits That Are Significantly Improving My Life",
                description:
                  "These habits will support your health, your mental wellbeing, and your personal growth journey.\n",
                date: "2022-02-03",
                slug: "3-morning-habits-that-are-significantly-improving-my-life",
                readingTime: 123,
                cardData: {
                  id: 4,
                  description:
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n\n",
                  image: {
                    data: {
                      id: 17,
                      attributes: {
                        name: "32.jpg",
                        alternativeText: "32.jpg",
                        caption: "32.jpg",
                        width: 750,
                        height: 500,
                        formats: {
                          thumbnail: {
                            name: "thumbnail_32.jpg",
                            hash: "thumbnail_32_035e16b5a0",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            width: 234,
                            height: 156,
                            size: 7.81,
                            path: null,
                            url: "/uploads/thumbnail_32_035e16b5a0.jpg",
                          },
                          small: {
                            name: "small_32.jpg",
                            hash: "small_32_035e16b5a0",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            width: 500,
                            height: 333,
                            size: 24.97,
                            path: null,
                            url: "/uploads/small_32_035e16b5a0.jpg",
                          },
                        },
                        hash: "32_035e16b5a0",
                        ext: ".jpg",
                        mime: "image/jpeg",
                        size: 40.02,
                        url: "/uploads/32_035e16b5a0.jpg",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2022-02-06T22:45:38.914Z",
                        updatedAt: "2022-02-06T22:45:38.914Z",
                      },
                    },
                  },
                },
                blogCategories: {
                  data: [
                    {
                      id: 1,
                      attributes: {
                        name: "Zdrowie",
                        slug: "zdrowie",
                        description: "Naucz się jak dbać o siebie.",
                        createdAt: "2022-02-03T15:55:17.356Z",
                        updatedAt: "2022-03-17T17:27:08.236Z",
                      },
                    },
                    {
                      id: 3,
                      attributes: {
                        name: "Gotowanie",
                        slug: "gotowanie",
                        description: "adsadsad",
                        createdAt: "2022-02-03T19:15:11.422Z",
                        updatedAt: "2022-03-17T18:17:29.870Z",
                      },
                    },
                  ],
                },
                mainImage: {
                  id: 2,
                  description:
                    "Zdjecie autorstwa [Marka](http://localhost:1337/admin/content-manager/collectionType/api::blog.blog/1) z [Unsplash](http://localhost:1337/admin/content-manager/collectionType/api::blog.blog/1)",
                  image: {
                    data: {
                      id: 13,
                      attributes: {
                        name: "0_8LHpqt74TEc8SGRH.jpg",
                        alternativeText: "facet nad morzem",
                        caption: "0_8LHpqt74TEc8SGRH.jpg",
                        width: 700,
                        height: 1050,
                        formats: {
                          thumbnail: {
                            name: "thumbnail_0_8LHpqt74TEc8SGRH.jpg",
                            hash: "thumbnail_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            width: 104,
                            height: 156,
                            size: 4.83,
                            path: null,
                            url: "/uploads/thumbnail_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9.jpg",
                          },
                          large: {
                            name: "large_0_8LHpqt74TEc8SGRH.jpg",
                            hash: "large_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            width: 667,
                            height: 1000,
                            size: 124.1,
                            path: null,
                            url: "/uploads/large_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9.jpg",
                          },
                          medium: {
                            name: "medium_0_8LHpqt74TEc8SGRH.jpg",
                            hash: "medium_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            width: 500,
                            height: 750,
                            size: 74.53,
                            path: null,
                            url: "/uploads/medium_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9.jpg",
                          },
                          small: {
                            name: "small_0_8LHpqt74TEc8SGRH.jpg",
                            hash: "small_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9",
                            ext: ".jpg",
                            mime: "image/jpeg",
                            width: 333,
                            height: 500,
                            size: 35.53,
                            path: null,
                            url: "/uploads/small_0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9.jpg",
                          },
                        },
                        hash: "0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9",
                        ext: ".jpg",
                        mime: "image/jpeg",
                        size: 139.46,
                        url: "/uploads/0_8_L_Hpqt74_T_Ec8_SGRH_c7879cbfd9.jpg",
                        previewUrl: null,
                        provider: "local",
                        provider_metadata: null,
                        createdAt: "2022-02-03T18:54:08.507Z",
                        updatedAt: "2022-02-06T16:44:27.868Z",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
