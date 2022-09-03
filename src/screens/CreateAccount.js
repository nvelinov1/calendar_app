import React, { useState, useEffect } from 'react'
import { Stack, Button, Typography, TextField, Container, Grid } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import '@fontsource/roboto/300.css';

export default function CreateAccount() {
    
    const [registerInfo, setRegisterInfo] = useState({email: "", password: "", confirm_password: ""})

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            navigate("/calendar");
          }
        });
    }, [navigate]);

    const onRegister = async () => {
        if (registerInfo.password !== registerInfo.confirm_password) {
            alert("The entered passwords do not match.")
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
            navigate("/calendar")
        }
        catch(error) {
            alert(error.message)
        }

    }

    return (
        <Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: '90vh', border: '2px solid black' }}>
                <Stack spacing={2} direction="column">
                    <Typography align="center" variant="h2">Create Your Account</Typography>
                    <TextField required label="Email" variant="filled" type="email" value={registerInfo.email} onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
                    <TextField required label="Password" variant="filled" type="password" value={registerInfo.password} onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} /> 
                    <TextField required label="Confirm Password" variant="filled" type="password" value={registerInfo.confirm_password} onChange={(e) => setRegisterInfo({...registerInfo, confirm_password: e.target.value})} />
                    <Button variant="contained" color='success' onClick={()=> onRegister()}>Create Account</Button>
                    <Typography align="center" variant="h6" component={Link} to="/login" sx={{ textDecoration: "none"}}>Already have an account? Log in now!</Typography>
                </Stack>
            </Grid>
        </Container>
    )
}
