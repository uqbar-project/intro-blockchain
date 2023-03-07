
export function handleRPCError(error) {
  const parsedError = JSON.stringify(error.message)
  if (parsedError.includes('execution reverted: ')) {
    const rgx = /(?<=execution reverted: )(.*)(?=\\n{)/g
    const rgxResult = rgx.exec(parsedError)
    return Array.isArray(rgxResult) ? rgxResult[0] : rgxResult
  }
  return 'Unknown error'
}