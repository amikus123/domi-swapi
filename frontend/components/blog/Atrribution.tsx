import React from "react"

// combinations
// none
//

interface AuthorProps {
  authorName?: string
  authorLink?: string
}

interface PageProps {
  pageName?: string
  pageLink?: string
}
export interface PossibleData extends AuthorProps, PageProps {}

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
  data: PossibleData
}
const Atrribution = ({ data }: AtrributionProps) => {
  return (
    <>
      {Object.keys(data).length !== 0 && (
        <div>
          Zdjęcie{" "}
          <AuthorPart
            authorLink={data.authorLink}
            authorName={data.authorName}
          />
          <PagePart pageName={data.pageName} pageLink={data.pageLink} />
        </div>
      )}

      {JSON.stringify(data)}
    </>
  )
}

export default Atrribution
