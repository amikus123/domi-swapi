import React, { useEffect } from "react"

interface BMUnordedListProps {
  children: any
  [x: string]: any
}

export const BMUnordedList = ({ children, ...props }: BMUnordedListProps) => {
  useEffect(() => {
    console.log(children)
  }, [children])
  return <p>{children}</p>
}
