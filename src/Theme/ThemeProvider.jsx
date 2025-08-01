import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import { useMemo, useState, useEffect, createContext, useContext } from "react";

// Contexto para cambiar el modo del tema
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

// Función para obtener el modo inicial de forma segura
const getInitialMode = () => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    localStorage.setItem("theme", mode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        setMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => {
    let newTheme = createTheme({
      palette: {
        mode,
        primary: {
          light: "#B388FF", // Morado claro (se mantiene)
          main: "#7C4DFF", // Morado vibrante (se mantiene)
          dark: "#651FFF", // Morado oscuro (se mantiene)
          contrastText: "#FFFFFF",
        },
        secondary: {
          light: "#63E6BE", // Verde menta claro
          main: "#20C997", // Verde menta vibrante
          dark: "#0CA678", // Verde menta oscuro
          contrastText: "#FFFFFF",
        },
        success: {
          main: "#40C057", // Verde éxito
          contrastText: "#FFFFFF",
        },
        warning: {
          main: "#FFD43B", // Amarillo mostaza
          contrastText: "#1A1A1A",
        },
        error: {
          main: "#FA5252", // Rojo coral
          contrastText: "#FFFFFF",
        },
        info: {
          main: "#4DABF7", // Azul cielo
          contrastText: "#FFFFFF",
        },
        background: {
          default: mode === "light" ? "#F8F9FA" : "#212529", // Gris muy claro / Gris oscuro
          paper: mode === "light" ? "#20C997" : "#7C4DFF", // Verde menta / Morado
        },
        text: {
          primary: mode === "light" ? "#212529" : "#E9ECEF", // Negro suave / Blanco roto
          secondary: mode === "light" ? "#495057" : "#ADB5BD", // Gris medio / Gris claro
        },
        custom: {
          primary: mode === "light" ? "#F8F9FA" : "#63E6BE", // Gris claro / Verde menta claro
          secondary: mode === "light" ? "#7C4DFF" : "#20C997", // Morado / Verde menta
        },
      },
      typography: {
        fontFamily: '"Open Sans", "Roboto", "Arial", sans-serif',

        h1: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 700,
          fontSize: "2.5rem",
          lineHeight: 1.2,
          letterSpacing: "-0.01562em",
          color: mode === "light" ? "#343A40" : "#E9ECEF",

          "@media (max-width:1200px)": {
            fontSize: "2.5rem",
          },
          "@media (max-width:900px)": {
            fontSize: "2rem",
          },
          "@media (max-width:600px)": {
            fontSize: "1.75rem",
            lineHeight: 1.3,
          },
          "@media (max-width:400px)": {
            fontSize: "1.5rem",
            lineHeight: 1.35,
          },
        },

        h2: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: "2.25rem", // 36px base
          lineHeight: 1.3,
          color: mode === "light" ? "#495057" : "#DEE2E6",

          "@media (max-width:1200px)": {
            fontSize: "2rem", // 32px
          },
          "@media (max-width:900px)": {
            fontSize: "1.75rem", // 28px
          },
          "@media (max-width:600px)": {
            fontSize: "1.5rem", // 24px
          },
          "@media (max-width:400px)": {
            fontSize: "1.375rem", // 22px
          },
        },

        h5: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: "1.2rem",
          color: mode === "light" ? "#7C4DFF" : "#20C997",

          "@media (max-width:1200px)": {
            fontSize: "1.1rem", // lg
          },
          "@media (max-width:900px)": {
            fontSize: "1rem", // md
          },
          "@media (max-width:600px)": {
            fontSize: "0.95rem", // sm
          },
          "@media (max-width:400px)": {
            fontSize: "0.9rem", // xs
          },
        },

        subtitle1: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 600,
          fontSize: "1rem",
          color: mode === "light" ? "#6C757D" : "#ADB5BD",

          "@media (max-width:1200px)": {
            fontSize: "0.95rem", // lg
          },
          "@media (max-width:900px)": {
            fontSize: "0.925rem", // md
          },
          "@media (max-width:600px)": {
            fontSize: "0.875rem", // sm
          },
          "@media (max-width:400px)": {
            fontSize: "0.825rem", // xs
          },
        },

        subtitle2: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 600,
          fontSize: "0.875rem",
          color: mode === "light" ? "#6C757D" : "#ADB5BD",

          "@media (max-width:1200px)": {
            fontSize: "0.85rem", // lg
          },
          "@media (max-width:900px)": {
            fontSize: "0.825rem", // md
          },
          "@media (max-width:600px)": {
            fontSize: "0.8rem", // sm
          },
          "@media (max-width:400px)": {
            fontSize: "0.75rem", // xs
          },
        },

        body1: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: "1rem", // >= md
          lineHeight: 1.5,
          color: mode === "light" ? "#495057" : "#E9ECEF",

          "@media (max-width:1200px)": {
            fontSize: "0.95rem", // lg
          },
          "@media (max-width:900px)": {
            fontSize: "0.925rem", // md
          },
          "@media (max-width:600px)": {
            fontSize: "0.875rem", // sm
          },
          "@media (max-width:400px)": {
            fontSize: "0.8rem", // xs
          },
        },

        body2: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: "0.875rem",
          lineHeight: 1.43,
          color: mode === "light" ? "#6C757D" : "#DEE2E6",

          "@media (max-width:1200px)": {
            fontSize: "0.85rem", // lg
          },
          "@media (max-width:900px)": {
            fontSize: "0.825rem", // md
          },
          "@media (max-width:600px)": {
            fontSize: "0.8rem", // sm
          },
          "@media (max-width:400px)": {
            fontSize: "0.75rem", // xs
          },
        },

        button: {
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          fontSize: "0.875rem",
          textTransform: "none",
        },

        lineHeight: 1.75,
        caption: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: "0.75rem",
          color: mode === "light" ? "#6C757D" : "#ADB5BD",
        },

        overline: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 400,
          fontSize: "0.625rem",
          textTransform: "uppercase",
          color: mode === "light" ? "#6C757D" : "#ADB5BD",
        },
      },

      shape: {
        borderRadius: 8,
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            "*": {
              scrollbarWidth: "thin",
              scrollbarColor: "#c1c1c1 #f5f5f5",
            },
            "*::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "10px",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a8a8a8",
            },
          },
        },

        MuiAppBar: {
          styleOverrides: {
            root: ({ theme }) => ({
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
              color: mode === "light" ? "#F7F7F7" : "#FFD166",
            }),
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              boxShadow:
                mode === "dark"
                  ? "0 2px 4px rgba(0,0,0,0.1)"
                  : "0 2px 4px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                boxShadow:
                  mode === "dark"
                    ? "0 4px 8px rgba(0,0,0,0.15)"
                    : "0 4px 8px rgba(0,0,0,0.4)",
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: "8px 20px",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              },
            },
          },
          variants: [
            {
              props: { variant: "danger" },
              style: {
                backgroundColor: "#D7263D",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#A4161A",
                },
              },
            },
            {
              props: { variant: "success" },
              style: {
                backgroundColor: "#00C896",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#00A37C",
                },
              },
            },
            {
              props: { variant: "whatsapp" },
              style: {
                backgroundColor: "#25D366",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#128C7E",
                },
              },
            },
            {
              props: { variant: "call" },
              style: {
                backgroundColor: "#34B7F1",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#269BD1",
                },
              },
            },
            {
              props: { variant: "adminSquare" },
              style: ({ theme }) => ({
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.primary.dark
                      : theme.palette.primary.main,
                },
              }),
            },
          ],
        },

        MuiOutlinedInput: {
          styleOverrides: {
            root: ({ theme }) => ({
              borderRadius: 4,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "light"
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.light,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.dark,
              },
            }),
            input: ({ theme }) => ({
              "&:-webkit-autofill": {
                boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
                WebkitTextFillColor:
                  theme.palette.mode === "light"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                transition: "background-color 5000s ease-in-out 0s", // opcional para evitar parpadeo
              },
            }),
          },
        },

        MuiTextField: {
          defaultProps: {
            variant: "outlined",
            size: "small",
            fullWidth: true,
          },
        },

        MuiInputAdornment: {
          styleOverrides: {
            positionEnd: {
              cursor: "pointer",
            },
          },
        },

        MuiInputLabel: {
          styleOverrides: {
            // Estilos para la etiqueta flotante (label)
            root: ({ theme }) => ({
              fontSize: "0.875rem", // Tamaño de fuente del label
              fontWeight: 400, // Grosor del texto del label
              color:
                theme.palette.mode === "light"
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,

              "&.Mui-focused": {
                // Color del label cuando el input está enfocado
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
              },
            }),
          },
        },

        MuiInputBase: {
          styleOverrides: {
            // Estilo general de todos los inputs base (TextField, Select, etc.)
            root: {
              fontSize: "0.875rem", // Tamaño de fuente
              fontWeight: 400, // Peso de la fuente
            },
            input: {
              fontSize: "0.875rem", // Tamaño dentro del campo
              fontWeight: 400, // Peso del texto
            },
          },
        },

        MuiDivider: {
          styleOverrides: {
            root: {
              borderColor: mode === "light" ? "#5C6B73" : "#A0AEC0",
            },
          },
        },

        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: mode === "light" ? "#3A5169" : "#FFD166",
              "&.Mui-checked": {
                color: mode === "light" ? "#3A5169" : "#FFD166",
              },
            },
          },
          defaultProps: {
            size: "small",
          },
        },

        MuiRadio: {
          styleOverrides: {
            root: {
              color: mode === "light" ? "#F7F7F7" : "#FFD166",
              "&.Mui-checked": {
                color: mode === "light" ? "#F7F7F7" : "#FFD166",
              },
            },
          },
          defaultProps: {
            size: "small",
          },
        },

        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h1: "h1",
              h2: "h2",
              h5: "h5",
              subtitle1: "p",
              subtitle2: "p",
              body1: "p",
              body2: "p",
            },
          },
        },
      },
    });

    return responsiveFontSizes(newTheme);
  }, [mode]);

  // Agrega clase al body para estilos globales si lo deseas
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${mode}`);
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

////////////////////////////////////////////////////////////////////////////////
// import {
//   createTheme,
//   ThemeProvider,
//   CssBaseline,
//   responsiveFontSizes,
// } from "@mui/material";
// import { useMemo, useState, useEffect, createContext, useContext } from "react";

// const ColorModeContext = createContext({ toggleColorMode: () => {} });

// export const useColorMode = () => useContext(ColorModeContext);

// export const CustomThemeProvider = ({ children }) => {
//   const [mode, setMode] = useState("light");

//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () =>
//         setMode((prev) => (prev === "light" ? "dark" : "light")),
//     }),
//     []
//   );

//   const theme = useMemo(() => {
//     const palette = {
//       mode,
//       primary: {
//         light: "#B388FF",
//         main: "#7C4DFF",
//         dark: "#651FFF",
//         contrastText: "#FFFFFF",
//       },
//       secondary: {
//         light: "#5DF2D6",
//         main: "#00BFA5",
//         dark: "#008E76",
//         contrastText: "#FFFFFF",
//       },
//       success: {
//         main: "#28a745",
//         contrastText: "#FFFFFF",
//       },
//       warning: {
//         main: "#FFC107",
//         contrastText: "#1A1A1A",
//       },
//       error: {
//         main: "#DC143C",
//         contrastText: "#FFFFFF",
//       },
//       info: {
//         main: "#2196f3",
//         contrastText: "#FFFFFF",
//       },
//       background: {
//         default: mode === "light" ? "#F9F9F9" : "#121212",
//         paper: mode === "light" ? "#FFFFFF" : "#1E1E1E",
//       },
//       text: {
//         primary: mode === "light" ? "#111" : "#E0E0E0",
//         secondary: mode === "light" ? "#555" : "#A0AEC0",
//       },
//     };

//     const theme = createTheme({
//       palette,
//       typography: {
//         fontFamily: `'Poppins', 'Roboto', 'Arial', sans-serif`,
//         h1: {
//           fontWeight: 700,
//           fontSize: "2.5rem",
//         },
//         button: {
//           textTransform: "none",
//           fontWeight: 600,
//         },
//       },
//       shape: {
//         borderRadius: 12,
//       },
//       components: {
//         MuiCssBaseline: {
//           styleOverrides: {
//             "*": {
//               scrollbarWidth: "thin",
//               scrollbarColor: "#c1c1c1 #f5f5f5",
//             },
//             "*::-webkit-scrollbar": {
//               width: "8px",
//               height: "8px",
//             },
//             "*::-webkit-scrollbar-thumb": {
//               backgroundColor: "#c1c1c1",
//               borderRadius: "10px",
//             },
//             "*::-webkit-scrollbar-thumb:hover": {
//               backgroundColor: "#a8a8a8",
//             },
//           },
//         },
//         MuiButton: {
//           styleOverrides: {
//             root: {
//               borderRadius: 12,
//               padding: "8px 20px",
//               fontWeight: 600,
//               boxShadow: "none",
//               "&:hover": {
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//               },
//             },
//           },
//           variants: [
//             {
//               props: { variant: "danger" },
//               style: {
//                 backgroundColor: "#DC143C",
//                 color: "#FFFFFF",
//                 "&:hover": {
//                   backgroundColor: "#B22222",
//                 },
//               },
//             },
//             {
//               props: { variant: "success" },
//               style: {
//                 backgroundColor: "#28a745",
//                 color: "#FFFFFF",
//                 "&:hover": {
//                   backgroundColor: "#218838",
//                 },
//               },
//             },
//             {
//               props: { variant: "upload" },
//               style: {
//                 backgroundColor: "#00BFA5",
//                 color: "#FFFFFF",
//                 "&:hover": {
//                   backgroundColor: "#009E88",
//                 },
//               },
//             },
//           ],
//         },
//         MuiTextField: {
//           styleOverrides: {
//             root: {
//               borderRadius: 12,
//             },
//           },
//           defaultProps: {
//             variant: "outlined",
//             size: "small",
//             fullWidth: true,
//           },
//         },
//         MuiOutlinedInput: {
//           styleOverrides: {
//             root: ({ theme }) => ({
//               borderRadius: 12,
//               "& .MuiOutlinedInput-notchedOutline": {
//                 borderColor:
//                   theme.palette.mode === "light"
//                     ? theme.palette.secondary.main
//                     : theme.palette.secondary.light,
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor:
//                   theme.palette.mode === "light"
//                     ? theme.palette.primary.main
//                     : theme.palette.primary.light,
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: theme.palette.secondary.dark,
//               },
//             }),
//             input: ({ theme }) => ({
//               "&:-webkit-autofill": {
//                 boxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
//                 WebkitTextFillColor: theme.palette.text.primary,
//                 transition: "background-color 5000s ease-in-out 0s",
//               },
//             }),
//           },
//         },
//         MuiInputLabel: {
//           styleOverrides: {
//             root: ({ theme }) => ({
//               fontSize: "0.875rem",
//               fontWeight: 400,
//               color: theme.palette.text.primary,
//               "&.Mui-focused": {
//                 color: theme.palette.text.primary,
//               },
//             }),
//           },
//         },
//         MuiTypography: {
//           defaultProps: {
//             variantMapping: {
//               h1: "h1",
//               h2: "h2",
//               h5: "h5",
//               subtitle1: "p",
//               subtitle2: "p",
//               body1: "p",
//               body2: "p",
//             },
//           },
//         },
//       },
//     });

//     return responsiveFontSizes(theme);
//   }, [mode]);

//   useEffect(() => {
//     document.body.classList.remove("theme-light", "theme-dark");
//     document.body.classList.add(`theme-${mode}`);
//     document.body.style.transition =
//       "background-color 0.3s ease, color 0.3s ease";
//   }, [mode]);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };
