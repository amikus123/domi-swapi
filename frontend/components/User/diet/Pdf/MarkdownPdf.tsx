import React from "react"
import Html from "react-pdf-html";

import showdown from "showdown"
interface BlogMarkdownProps {
  text: string
}

const MarkdownPdf = ({ text }: BlogMarkdownProps) => {
  const converter = new showdown.Converter()
    
  return <Html>{converter.makeHtml(text)}</Html>
}

export default MarkdownPdf
