import React from "react"

interface BMUnordedListProps {
  children: any
  [x: string]: any
}

export const BMUnordedList = ({ children, ...props }: BMUnordedListProps) => {
  return <p>{children}</p>
}
