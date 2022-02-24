export const stringToDate = (dateStr:string): Date => {
    //* dateStr should be in format  YYYY-MM-DD (same as revided from strapi)
    let [y,m,d] = dateStr.split("-")
    return new Date(`${m} ${d}, ${y} 00:00:00`)
  }