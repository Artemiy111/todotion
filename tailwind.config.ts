import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'
const colorValues = [50, 100, 200, 300]
const colorSaveList = []
for (const color in colors) {
  for (const colorValue of colorValues) {
    colorSaveList.push(`bg-${color}-${colorValue}`)
    colorSaveList.push(`hover:bg-${color}-${colorValue}`)
    colorSaveList.push(`focus:bg-${color}-${colorValue}`)
    colorSaveList.push(`focus-within:bg-${color}-${colorValue}`)
    colorSaveList.push(`active:bg-${color}-${colorValue}`)
  }
}
console.log(colorSaveList)

export default <Partial<Config>>{ safelist: colorSaveList }
