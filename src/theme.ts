import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#dcf7ff",
      100: "#b0e2ff",
      200: "#82cdfa",
      300: "#53b9f6",
      400: "#26a5f3",
      500: "#0c8bd9",
      600: "#006caa",
      700: "#004d7b",
      800: "#002e4c",
      900: "#00101f",
    },
  },
});

export default theme;
