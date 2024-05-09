import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import AuthUserContext  from '../contexts/AuthUserContext'
import Waiting from '../ui/Waiting'

export default function AuthGuard({ children }) {

  const [hasAuthUser, setHasAuthUser] = React.useState() // undefined
  const { setAuthUser } = React.useContext(AuthUserContext)

  const location = useLocation()

  async function checkAuthUser() {
    const token = window.localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_NAME)
    if(!token){
      setAuthUser(null)
      setHasAuthUser(false)
      return
    }
    try {
      const response = await axios.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}` // Configura o token no cabeçalho Authorization
        }
      })
      if(response.status === 200) {  
        setHasAuthUser(true);
      }
      else{
        throw new Error("Não foi possível obter os dados do usuário");
      }
      
    }
    catch(error) {
      console.log(error)
      
      // Apaga as informações do usuário logado no contexto
      setAuthUser(null)
      setHasAuthUser(false)
    }
  }

  React.useEffect(() => {
    checkAuthUser()
  }, [])

  // Enquanto ainda não temos a resposta do back-end para /users/me,
  // exibimos um componente Waiting
  if(hasAuthUser === undefined) return <Waiting show={true} />

  return hasAuthUser ? children : <Navigate to="/" replace />
  
}