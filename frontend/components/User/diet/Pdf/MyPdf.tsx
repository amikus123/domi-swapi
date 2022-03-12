import * as React from "react"
import dynamic from "next/dynamic"
import { DishColumnData } from "../api/types"
import GenerateHtml from "./GenerateHtml"
const GeneratePDF = dynamic(() => import("./GeneratePdf"), { ssr: false })

interface MyPdfProps {
  dietDays: DishColumnData[]
}
const MyPdf = ({ dietDays }: MyPdfProps) => {
  const ref = React.useRef()

  return (
    <div className="main">
      <div className="content" ref={ref}>
        <h1 id="title">Dieta </h1>
        {dietDays.map((item, index) => {
          return <GenerateHtml key={index} item={item} />
        })}
      </div>
      <GeneratePDF html={ref} />
    </div>
  )
}

export default MyPdf
