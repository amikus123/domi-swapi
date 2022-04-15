import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { capitalize } from "lodash"
import React from "react"


interface BlogBreadcrumbsProps{
    category:string
}
const BlogBreadcrumbs = ({category}:BlogBreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="">Strona główna</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="/blog/">Kategorie </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/blog/${category}`}>{capitalize(category)}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default BlogBreadcrumbs
