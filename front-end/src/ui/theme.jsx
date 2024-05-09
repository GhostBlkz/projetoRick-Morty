import {createTheme} from '@mui/material/styles'
import { yellow, blue } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { //cor primaria
            main: yellow[500]
        },
        secondary: { //cor secundaria
            main: "#f5f5f5"
        },
        terciary: { // cor terciaria
            main: blue[500]
        }
    },
    typography: {
        h1:{
            fontSize: '30pt',
            fontWeight: 'bold'
        }
    }
})
export default theme