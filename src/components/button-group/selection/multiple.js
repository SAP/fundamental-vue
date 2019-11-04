export default (selection, value) => {
  const newSelection = [...selection]
  const index = selection.indexOf(value)
  if (index > -1) {
    newSelection.splice(index, 1)
  } else {
    newSelection.push(value)
  }
  return newSelection
}
