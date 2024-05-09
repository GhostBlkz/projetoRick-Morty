import { useState, useEffect } from 'react';
import { Paper, Chip, Switch, Slide } from '@mui/material'
import FormSignup from '../FormLogin-Signup/signup';
import FormLogin from '../FormLogin-Signup/Login';
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';


function LoginPage() {

    const [checked, setChecked] = useState(true)
    const [slideIn, setSlideIn] = useState(false);

    useEffect(() => {
        setSlideIn(true);
    }, []);


    const handleChange = (event) => {
        setChecked(event.target.checked);
    }
    return (
        <div className='LoginPage'>

            <Slide direction="up" in={slideIn} mountOnEnter unmountOnExit>
            <Paper elevation={6} style={{ padding: '10px', width: 350, margin: "10% auto" }}>
                <div align="center">
                   
                    {checked ? (
                        <Chip
                            id = "chip2"
                            label="Entrar"
                            color='info'
                            variant='outlined'
                            icon={<LockIcon />}
                            margin="normal"
                        />

                    ) : (
                        <Chip
                            id ="chip1"
                            label="Criar conta"
                            color='info'
                            variant='outlined'
                            icon={<FaceIcon/>}
                        />
                    )}
                    <br />
                    <Switch checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controled' }}
                        id='check1'
                        color='info'
                    />
                </div>
                {checked ? <FormLogin /> : <FormSignup />}
            </Paper>
            </Slide>
        </div>
    )
}

export default LoginPage