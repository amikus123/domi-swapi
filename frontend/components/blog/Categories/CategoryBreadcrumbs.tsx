import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from "@chakra-ui/react"
import { upperFirst } from "lodash"
import NextLink from "next/link"
import React, { useEffect } from "react"

interface CategoryBreadcrumbsProps {
  links: NameAndLink[]
}

interface NameAndLink {
  name: string
  href: string
}

const CategoryBreadcrumbs = ({ links }: CategoryBreadcrumbsProps) => {
  useEffect(() => {
    console.log(links)
  })
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink as={NextLink} href="/">
          <Link>Strona główna</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      {links.map((item, index) => {
        const { href, name } = item
        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink as={NextLink} href={href}>
              <Link>{upperFirst(name)}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default CategoryBreadcrumbs
