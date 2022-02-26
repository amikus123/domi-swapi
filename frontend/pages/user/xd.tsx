import React, { useEffect, useState } from "react"

const xd = () => {
  const [s, setS] = useState({ a: 1 })
  const [x, setX] = useState({ s, b: 1 })

  useEffect(() => {
    console.log(s)
  }, [s])

  return (
    <div>
      <p>{JSON.stringify(s)}</p>
      <p>{JSON.stringify(x)}</p>
      <button
        onClick={() => {
          setS({ a: s.a + 1 })
        }}
      >
        ss
      </button>
    </div>
  )
}

export default xd
