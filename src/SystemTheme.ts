import { CSSProperties } from "styled-components"

enum SystemThemeVariants {
    LIGHT,
    DARK
}



// export const SystemTheme = {
//     theme: SystemThemeVariants.LIGHT,
//     getTheme: (dark: string, light: string) => {
//         if (SystemTheme.theme == SystemThemeVariants.DARK) {
//             return `var(${dark})`
//         }
//         if (SystemTheme.theme == SystemThemeVariants.LIGHT) {
//             return `var(${light})`
//         }
//     },
//     mainBackground: getTheme(`--app-main-background-light`, `--app-main-background-dark`),
//     secondaryBackground: theme(``,``)
// }

// export abstract class SystemTheme {

// }
