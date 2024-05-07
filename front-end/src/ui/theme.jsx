import {createTheme} from '@mui/material/styles'
import { yellow } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { //cor primaria
            main: "#f5f5f5"
        },
        secondary: { //cor secundaria
            main: yellow[500]
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