import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { upperFirst } from "lodash"
import NextLink from "next/link"
import React from "react"

interface CategoryBreadcrumbsProps{
    category:string
}


const CategoryBreadcrumbs = ({category}:CategoryBreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/">
          Strona główna
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/categories">
          Kategorie
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem  isCurrentPage>
        <BreadcrumbLink>{upperFirst(category)}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}

export default CategoryBreadcrumbs
