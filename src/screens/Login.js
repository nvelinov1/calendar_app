import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/system'
import { TextField, Typography, Button, Container } from '@mui/material'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })

    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            navigate("/calendar");
          }
        });
    });

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            navigate("/calendar")
        }
        catch(error) {
            alert(error.message)
        }
    }

    return (
        <Container>
            <Stack spacing={2} direction="column">
                <Typography align="center" variant="h2">Log Into Your Account</Typography>
                <TextField required label="Email" variant="filled" type="email" value={loginInfo.email} onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})} />
                <TextField required label="Password" variant="filled" type="password" value={loginInfo.password} onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})} /> 
                <Button variant="contained" onClick={() => handleLogin()}>Log In</Button>
            </Stack>
        </Container>
    )
}
