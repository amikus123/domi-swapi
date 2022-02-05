import React from "react"
import { Text } from "@chakra-ui/react"

interface AuthorProps {
  authorName?: string
  authorLink?: string
}

interface PageProps {
  pageName?: string
  pageLink?: string
}
export interface AttributionProps extends AuthorProps, PageProps {}

const AuthorPart = ({ authorName, authorLink }: AuthorProps) => {
  const Helper = () => {
    if (!authorName) {
      return <></>
    } else if (!authorLink) {
      return <span>autorstwa {authorName} </span>
    } else {
      return (
        <span>
          <a href={authorLink}> {authorName}</a>{" "}
        </span>
      )
    }
  }
  return (
    <>
      <Helper />
    </>
  )
}

const PagePart = ({ pageLink, pageName }: PageProps) => {
  const Helper = () => {
    if (pageLink === pageName) {
      return <></>
    } else if (!pageLink) {
      return <span>z {pageName} </span>
    } else {
      return (
        <span>
          z <a href={pageLink}> {pageName}</a>{" "}
        </span>
      )
    }
  }

  return (
    <>
      <Helper />
    </>
  )
}

interface AtrributionProps {
  data: AttributionProps
}
const Atrribution = ({ data }: AtrributionProps) => {
  return (
    <>
      {Object.keys(data).length !== 0 && (
        <Text  color="gray.600">
          Zdjęcie{" "}
          <AuthorPart
            authorLink={data.authorLink}
            authorName={data.authorName}
          />
          <PagePart pageName={data.pageName} pageLink={data.pageLink} />
        </Text>
      )}

    </>
  )
}

export default Atrribution
