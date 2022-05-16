import { extendTheme } from "@chakra-ui/react"

// 2. Extend the theme to include custom colors, fonts, etc

export const theme = extendTheme({
  shadows: {
    outline: "0 0 0 3px rgba(72,187,120,0.6)",
  },
})
