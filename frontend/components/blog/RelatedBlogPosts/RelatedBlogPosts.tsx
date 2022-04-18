import { Flex, Button } from "@chakra-ui/react"
import { sampleSize } from "lodash"
import React, { useEffect, useState } from "react"
import { getBlogsByIds } from "../../../lib/server/fetching/serverSide"
import { BlogCardData } from "../BlogCard/BlogCardWide"
import CardStack from "../BlogCard/CardStack"
import NextLink from "next/link"
interface RelatedBlogPostsProps {
  currentBlogId: number
  blogIds: Record<number, boolean>
  category: string
}
const RelatedBlogPosts = ({
  blogIds,
  currentBlogId,
}: RelatedBlogPostsProps) => {
  const [availableIds, setAvailableIds] =
    useState<Record<number, boolean>>(blogIds)
  const [fetchedBlogs, setFetchedPosts] = useState<BlogCardData[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  useEffect(() => {
    const tmp = async () => {
      setIsFetching(true)

      const copy = { ...availableIds }
      delete copy[currentBlogId]
      const arr = Object.keys(copy)
      const randomIDs = sampleSize(arr, 1)

      const xd = await getBlogsByIds(randomIDs)
      randomIDs.forEach((id) => {
        delete copy[id]
      })
      setAvailableIds(copy)
      setFetchedPosts([...fetchedBlogs, ...xd])
      setIsFetching(false)
    }
    tmp()
  }, [currentBlogId])
  const getMoreBlogs = async () => {
    const arr = Object.keys(availableIds)
    setIsFetching(true)
    const randomIDs = sampleSize(arr, 3)

    console.log(randomIDs, arr)
    const xd = await getBlogsByIds(randomIDs)

    // removing ids
    const copy = { ...availableIds }
    randomIDs.forEach((id) => {
      delete copy[id]
    })
    setAvailableIds(copy)
    setFetchedPosts([...fetchedBlogs, ...xd])
    setIsFetching(false)
    console.log(xd)
  }
  return (
    <>
      <Flex py={12} w="100%" direction="column" align="center">
        <CardStack cards={fetchedBlogs} />
        {Object.keys(availableIds).length === 0 ? (
          <Button colorScheme="teal" w="60" size="lg">
            <NextLink href="/blog/">Sprawdź inne kategorie</NextLink>
          </Button>
        ) : (
          <Button
            w="60"
            colorScheme="teal"
            size="lg"
            isLoading={isFetching}
            onClick={getMoreBlogs}
          >
            Więcej artykułów
          </Button>
        )}
      </Flex>
    </>
  )
}

export default RelatedBlogPosts
