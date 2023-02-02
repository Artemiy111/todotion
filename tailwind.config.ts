import type { Config } from 'tailwindcss'

import colors from 'tailwindcss/colors'

const colorValues = [50, 100, 200, 300, 500, 600, 700, 800, 900]
const colorSaveList = []
for (const color in colors) {
  for (const colorValue of colorValues) {
    colorSaveList.push(`bg-${color}-${colorValue}`)
    colorSaveList.push(`hover:bg-${color}-${colorValue}`)
    colorSaveList.push(`focus:bg-${color}-${colorValue}`)
    colorSaveList.push(`focus-within:bg-${color}-${colorValue}`)
    colorSaveList.push(`active:bg-${color}-${colorValue}`)

    colorSaveList.push(`dark:bg-${color}-${colorValue}`)
    colorSaveList.push(`dark:hover:bg-${color}-${colorValue}`)
    colorSaveList.push(`dark:focus:bg-${color}-${colorValue}`)
    colorSaveList.push(`dark:focus-within:bg-${color}-${colorValue}`)
    colorSaveList.push(`dark:active:bg-${color}-${colorValue}`)
  }
}

export default <Partial<Config>>{
  darkMode: 'class',
  safelist: colorSaveList,
  theme: {
    screens: {
      xs: { max: '400px' },
      sm: { max: '640px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
    },
    container: {
      screens: {
        DEFAULT: '1024px',
      },
    },
  },
}
