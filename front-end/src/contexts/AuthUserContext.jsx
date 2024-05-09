import React from 'react'

const AuthUserContext = React.createContext() //esse contexto vai ser usado para armazenar as infos do usuario autenticado o tempo todo 
                                              // sem necessidade de criar AuthUserContext em cada componente

export default AuthUserContext