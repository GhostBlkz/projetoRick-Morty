import React, { Component, useState } from 'react'
import {
    TextField,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    IconButton,
    Button,
    Alert,
    Stack
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import AuthUSerContext from '../contexts/AuthUserContext.jsx';
import Waiting from '../ui/Waiting';
import axios from 'axios';





// Email Validation
const isEmail = (email) => //função que valida emails
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
export default function FormLogin() {



    //Campo de senha
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //Notificações e Waiting
    const [state, setState] = React.useState({
        showWaiting: false
    })
    const { showWaiting } = state

    //Inputs

    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const [formValid, setFormValid] = useState('')

    const { setAuthUser } = React.useContext(AuthUSerContext)





    async function handleSubmit(e) {
        e.preventDefault() //impede o reload da pagina



        if (emailError || !emailInput) {
            setFormValid("E-mail ou senha invalidos")
            return
        }
        if (passwordError || !passwordInput) {
            setFormValid("E-mail ou senha invalidos")
            return
        }



        setFormValid('')



        // Declarar uma nova variável dados com state e atribuir o objeto
        const data = {
            email: emailInput,
            password: passwordInput
        }

        const headers = {
            'headers': {
                // Indicar que será enviado os dados em formato de objeto
                'Content-Type': 'application/json'
            }
        }

        setState({ ...state, showWaiting: true })
        await axios.post('http://localhost:8080/users/login', data, headers)

            .then((response) => { // Acessa o then quando a API retornar status 200 e guarda token no local storage (inseguro)
                const {token, user} = response.data //primeiro separo os dados do token e do user que estao juntos
                console.log(response.data)

                window.localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_NAME, token) //mando somente o token para o local storage

                setAuthUser(user) //e guardo o user no contexto AuthUser


                setFormValid("Logado com Sucesso");
                setState({ ...state, showWaiting: false })


            }).catch((err) => { // Acessa o catch quando a API retornar erro
                console.log('Log de erro: ' + err)

                if (err.response) {
                    setFormValid("erro" + err.response)
                    setState({ ...state, showWaiting: false })

                } else {
                    setFormValid("erro generico");
                    setState({ ...state, showWaiting: false })

                }
            });



    }

    if (formValid == "Logado com Sucesso") navigate('/character') //se logar com sucesso redireciona para a pagina de personagens
   
    // Input Error 

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);






    //Validation para onBlur Email
    const handleEmail = () => {
        if (!isEmail(emailInput)) {
            setEmailError(true)
            return;
        }
        setEmailError(false) // retorna a cor normal caso o email seja valido
    }

    // validation para onblur password
    const handlePassword = () => {
        if (!passwordInput || passwordInput.length < 5 || passwordInput.length > 20) {
            setPasswordError(true)
            return
        }
        setPasswordError(false)
    }


    //fecha a barra de notificação





//montando o visual do componente
    return (
        <div>
            <Waiting show={showWaiting} />



            <p>
                <TextField
                    id='standard-basic2'
                    error={emailError}
                    label="E-mail"
                    value={emailInput}
                    onChange={(event) => setEmailInput(event.target.value)}
                    onBlur={handleEmail}
                    variant="standard"
                    inputProps={{}}
                    fullWidth
                    size="small" />
            </p>
            <p>
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel error={passwordError} htmlFor="standard-adornment-password">
                        Senha
                    </InputLabel>
                    <Input
                        fullWidth
                        error={passwordError}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onBlur={handlePassword}
                        onChange={(event) => setPasswordInput(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </p>

            <p>
                <Button onClick={handleSubmit} fullWidth variant="contained" endIcon={<LoginIcon />}>
                    Entrar
                </Button>
            </p>

            {formValid && (<Alert severity="success">
                {formValid}
            </Alert>)}








        </div>
    )
}