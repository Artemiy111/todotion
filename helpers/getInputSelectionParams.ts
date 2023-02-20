export const getInputParams = (event: Event) => {
  const target = event.target as HTMLInputElement
  const text = target.value
  const isEmpty = text.length === 0

  return { target, text, isEmpty }
}

export const getInputSelectionParams = (event: Event) => {
  const { target, text, isEmpty } = getInputParams(event)
  const start = target.selectionStart as number
  const end = target.selectionEnd as number

  const leftText = text.slice(0, start)
  const selectedText = text.slice(start, end)
  const rightText = text.slice(end, text.length)

  const isPoint = start === end
  const isStart = start === 0
  const isEnd = end === text.length

  return {
    target,
    text,
    start,
    end,
    leftText,
    selectedText,
    rightText,
    isPoint,
    isEmpty,
    isStart,
    isEnd,
  }
}
