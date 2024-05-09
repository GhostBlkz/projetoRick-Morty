import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

import { ThemeProvider } from '@mui/material/styles'
import theme from './ui/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import AppRoutes from './Routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import  AuthUSerContext  from './contexts/AuthUserContext';
import myfetch from './lib/myfetch';
import HeaderBar from './ui/HeaderBar';


function App() {
  //Armazena globalmente informações de usuario autenticado
  const [authUser, setAuthUser] = React.useState(null)
  async function fetchAuthUser() {
    try{
      const authUser = await myfetch.get('/users/me')
      if(authUser) setAuthUser(authUser)

    }
      
    catch(error){
      console.log(error)
    }


  }

   //Este useEffect() sera executado apenas uma vez, quando o componente
  // App for carregado (note o vetor de dependencias vazio). Ele irá perguntar]
  // ao back-end se existe algum usuário autenticado e, caso haja, ira armazenar
  //as informações dele em authUser

  React.useEffect(() => {
    fetchAuthUser()

  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <AuthUSerContext.Provider value={{authUser, setAuthUser}}>
          <HeaderBar/>
          <Box sx={{ margin: '24px 24px 72px 24px', }}>
          <AppRoutes />
          </Box>
          </AuthUSerContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
