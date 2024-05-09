import React from "react";
import { Typography, Button } from "@mui/material";
import AuthUserContext from "../contexts/AuthUserContext";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import theme from "./theme";

export default function AuthControl() {
    const { authUser, setAuthUser } = React.useContext(AuthUserContext)
    console.log(authUser)
    
    const navigate = useNavigate()

    function handleLogoutButtonClick() {
        if (window.confirm('Deseja realmente sair?')) {


            //Apaga o Token do LocalStorage
            window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME)

            //Apaga as informações de memoria do usuario autenticado
            setAuthUser(null)

            // sera redirecionado para a pagina de login
            navigate('/')
        }
    }

    if (authUser) {
        return (
            <>
                <AccountCircleIcon color="terciary" sx={{ mr: 1 }} />
                <Typography variant="caption" fontSize={16} color={theme.palette.terciary.main}>
                    {authUser.name}
                </Typography>
                <Button
                    color="terciary"
                    size="small"
                    onClick={handleLogoutButtonClick}
                    sx={{
                        ml: 0.75, // ml: marginLeft
                    }}>
                    Sair
                </Button>
            </>
        )
    }
    else {
        return (
            <Link to="/">
                <Button color="terciary">Entrar</Button>
            </Link>
        )
    }



}