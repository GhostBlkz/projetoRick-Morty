import {createTheme} from '@mui/material/styles'
import { yellow } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { //cor primaria
            main: yellow[500]
        },
        secondary: { //cor secundaria
            main: "#f5f5f5"
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