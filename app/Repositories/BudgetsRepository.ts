const qsPage = (qs) => {
  if (qs.hasOwnProperty('page')) {
    return qs.page
  } else {
    return 1
  }
}

const qsHandler = (qs) => {
  var query: string[] = []

  for (const prop in qs) {
    query.push(`${prop}, ${qs[prop]}`)
  }
  return query
}
export { qsPage, qsHandler }
