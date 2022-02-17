import { parseCookies } from "nookies"
import React from "react"
import { fetchAPI } from "../../lib/api"

const index = ({ userData }) => {
  return <div> {JSON.stringify(userData)}</div>
}

export default index

export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt

  // const userData = await fetchAPI(`/users/me`, {
  //   jwt
  // })
  const userData = await fetchAPI("/prots/", { jwt })

  return {
    props: { userData },
  }
}










/* 

CPM = BMR * PAL


 Dla kobiety
BMR = 
Dla mężczyzny
BMR = 

PAL
1,2 – siedzący tryb życia
1,3 – słabo aktywny (spacery i ćwiczenia 1-2 w tygodniu)
1,4 – średnio aktywny (amatorskie ćwiczenia 2-3 razy w tygodniu)
1,5 – aktywny (ciężkie ćwiczenia więcej niż 3 razy w tygodniu)
1,7 – mocno aktywny (ciężkie ćwiczenia codziennie)
2,0 – sportowcy zawodowi

*/