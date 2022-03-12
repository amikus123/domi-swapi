import React from "react"
import { jsPDF, HTMLOptionImage } from "jspdf"
import { toPng, toCanvas } from "html-to-image"
type props = {
  html?: React.MutableRefObject<HTMLDivElement>
}

const GeneratePdf: React.FC<props> = ({ html }) => {
  const generatePdf = () => {
    const doc = new jsPDF()
    // let split = doc.splitTextToSize(
    //   document.getElementById("text").innerText,
    //   200
    // )
    // let image = document.getElementById("image").getAttribute("src")
    // doc.addImage(image, 70, 7, 60, 60)
    // doc.text(split, 5, 75)

    doc.text(document.getElementById("title").innerHTML, 75, 5)
    const items = Array(document.getElementsByClassName("pdf"))
    items.forEach((item, index) => {
      doc.text("XD", 1, 1)
    })

    doc.output("dataurlnewwindow")

    doc.save("two-by-four.pdf")
  }

  const generateImage = async () => {
    const image = await toCanvas(html.current, { quality: 0.95 })
    const doc = new jsPDF()

    doc.addImage(image, "JPEG", 5, 22, 100, 80)
    doc.save()
  }

  return (
    <div className="button-container">
      <html></html>
      <button onClick={generatePdf}>Get PDF as text</button>
      <button onClick={generateImage}>Get PDF using image</button>
    </div>
  )
}

export default GeneratePdf
