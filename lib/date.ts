export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  })

export const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month =
    date.getMonth() < 9
      ? `0${date.getMonth() + 1}`
      : (date.getMonth() + 1).toString()
  const day =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString()

  return `${year}-${month}-${day}`
}
