import {
  BlogCategoriesWrapJson,
  BlogImageJson,
  BlogWrapJson,
  CardDataJson,
} from "../JsonTypes/blogJsonTypes"

export interface BlogPost {
  title: string
  description: string
  date: string
  content: any[]
  mainImage: BlogImageJson
  blogCategories: Category[]
  readingTime: number
  slug: string
  cardData: BlogCard
  id?:number
}

export interface Category {
  description: string
  slug: string
  name: string
}
export interface BlogCard {
  description: string
  image: any
}

export const handleCardData = (data: CardDataJson): BlogCard => {

  if(data===null){
    return{
      description:"",
      image:{}
    }
  }
  const { description, image } = data
  return {
    description,
    image,
  }
}

export const handleCategories = (data: BlogCategoriesWrapJson): Category[] => {
  const res: Category[] = data.data.map((item) => {
    const { description, name, slug } = item.attributes
    return {
      name,
      description,
      slug,
    }
  })
  return res
}
export const handleBlogPost = (initial: BlogWrapJson): BlogPost => {
  const { data } = initial
  const { attributes,id } = data[0]
  const {
    blogCategories,
    cardData,
    content,

    date,
    description,
    mainImage,
    readingTime,
    slug,
    title,
  } = attributes

  const res: BlogPost = {
    date,
    slug,
    title,
    mainImage,
    description,
    readingTime,
    blogCategories: handleCategories(blogCategories),
    cardData: handleCardData(cardData),
    content,
    id,
  }

  return res
}

export const example = {
  data: [
    {
      id: 1,
      attributes: {
        createdAt: "2022-02-03T16:00:04.658Z",
        updatedAt: "2022-04-15T20:29:23.568Z",
        title: "3 Morning Habits That Are Significantly Improving My Life",
        description:
          "These habits will support your health, your mental wellbeing, and your personal growth journey.\n",
        date: "2022-02-03",
        slug: "3-morning-habits-that-are-significantly-improving-my-life",
        readingTime: 123,
        content: [
          {
            id: 5,
            __component: "blog.text",
            text: "\n\n>“Every action is a brick, meaning it’s what you do on a daily basis that determines the house you end up with. You are the house you build.” — Nicolas Cole\n>\nI believe habits are the key to success in everything we do.\n\nFrom health to relationships to our career, if we get our habits right, the rest will follow. Habits are the tiny building blocks of our lives. In and of themselves, they’re small. But add them up, and you’ve got yourself a good life.\n\nThese are 3 habits that have significantly improved my life over the last year.",
          },
          { id: 1, __component: "blog.separator" },
          {
            id: 2,
            __component: "blog.text",
            text: "# 1. 45 minutes of formal movement\n\n**I’ve always been active, but dedicating myself to completing a 45-minute formal movement session every day has been life-changing.\n**\nThis ‘45 minutes’ is intentionally ambiguous — as someone prone to pushing way too hard and burning out, I need the flexibility to incorporate more recovery-directed days while still moving formally for 45 minutes (and by “formal” I mean I am intentionally exercising — for example, walking around the grocery store carrying heavy bags doesn’t count — I need to be doing some sort of workout).\n\nWhile I would usually exercise most days, there were definitely days when I would skip my workouts. Which, of course, is fine. But I’m at my most happy when I exercise.\n\nAnd having this allocated space every single day means I’m working on the things I wouldn’t normally work on.\n\nI’m sure many of you can relate. How much of your gym/workout time do you spend warming up, stretching, working on mobility, doing your rehab exercises, and working on injury prevention? If you’re anything like me, probably minimal.\n\nNow, being forced to do some sort of workout for 45 minutes, I’m getting all these things done. For example, after a weekend competing in ice hockey, I’ll spend my Monday session working on active recovery. Furthermore, if I know I have a heavy exercise day coming up, I’ll spend more time on mobility and injury prehab (prevention). Whereas before, I would do my lifting, then leave. I wanted to maximize my time at the gym in regards to getting as much lifting done as possible, and completely neglected everything else.\n\nSo not only am I exercising more regularly and consistently, but I am also teaching my body how to move properly, and ensuring my body stays healthy and mobile for a long time to come.\n\nI feel so much happier and healthier in my body, which is translating over into other areas of my life.",
          },
          {
            id: 1,
            __component: "blog.description-image",
            description:
              "My parents and me. There’s another like this one where he’s smiling, but it’s blurry.\n",
          },
          {
            id: 4,
            __component: "blog.text",
            text: "# 2. 10 minutes of meditation\nI know everyone is saying meditation is changing their life, but I truly believe[ it’s a practice everyone should include](https://medium.com/change-your-mind/3-simple-habits-that-are-significantly-improving-my-life-a10154c75050) in their lives in some form.\n\nIt’s like meditation gives you more space, more clarity, more contentment. A meditation practice helps you be content with how things are, right now, no matter how they look. And this increases your overall happiness and wellbeing.\n\nI have found that I’m more steady. Meditating regularly brings equanimity, and this is a characteristic I want in my life.\n\nI generally do my meditation in the morning, as I like having some stillness before the day gets started. However, if I don’t manage to get my morning session in then I’ll do it just before I get into bed in the evening. This is also a great way to promote good quality sleep.\n\nWe don’t all have to meditate in the same way, and a lot of us probably don’t even need to sit down to a formal meditation practice. However, having some sort of practice in your day where you can be still, introspective, and build this incredibly important skill is something that would be valuable to every single person.",
          },
          { id: 2, __component: "blog.separator" },
          {
            id: 1,
            __component: "blog.text",
            text: "# 3. Reading\nReading changes everything.\n\nIt changes your mind — your ideas, your beliefs, the paradigm you exist in. Expose yourself to uplifting, motivating, educational content on a regular basis and it will change your life.\n\nI read an average of 2 books per week, without actively trying to read that much. I just love reading. I read whenever I have a spare minute. I use it to wind down. I use it as a hobby. I use it to continually improve myself.\n\nReading may be the greatest tool at our disposal. Through books (and articles) we get to learn the things other people have spent their whole lives learning. And we can learn it in a matter of hours! Books provide access to how other people think, how they’ve achieved great things, and provide information on how we too can experience success in the areas that matter most.\n\nHaving a daily reading practice is incredibly powerful. Pretty much everything I know has come from a book I’ve read, somewhere, at some point in my life.\n\nIf you want to grow, if you want to become better, read. Read anything you can get your hands on. Read whenever you have a spare moment.",
          },
          { id: 1, __component: "blog.image" },
          {
            id: 6,
            __component: "blog.text",
            text: ">“A small daily task, if it be really daily, will beat the labours of a spasmodic Hercules.” — Anthony Trollope, nineteenth-century writer\n\nSmall tasks add up to big achievements.\n\nThe power of compounding is one of the most powerful forces in existence. Do something small every single day, and success will become inevitable. The tiny habits of exercise, meditation, and reading have significantly improved my life over the course of just a single year.\n\nImagine where you could be after a decade of tiny actions, repeated daily.",
          },
          { id: 3, __component: "blog.separator" },
          {
            id: 3,
            __component: "blog.text",
            text: "## Want to improve your health, one habit at a time?\n\nSign up for my **free** weekly newsletter, [Momentum](https://medium.com/change-your-mind/3-simple-habits-that-are-significantly-improving-my-life-a10154c75050). Each week you’ll receive one new habit to try. I’ll explain why it’s important and how to make it easy. **This newsletter will help you to create the momentum you need to move towards a healthier and happier future.**",
          },
        ],
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
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
