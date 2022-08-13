import React, { useState } from 'react'
import { Stack, Button, Typography, TextField, Container } from '@mui/material'
import '@fontsource/roboto/300.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function CreateAccount() {
    
    const [registerInfo, setRegisterInfo] = useState({email: "", password: "", confirm_password: ""})

    const navigate = useNavigate()

    const onRegister = async () => {
        if (registerInfo.password !== registerInfo.confirm_password) {
            alert("The entered passwords do not match.")
            return;
        }

        try {
            const user = await createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password)
            navigate("/calendar")
        }
        catch(error) {
            alert(error.message)
        }

    }

    return (
        <Container>
            <Stack spacing={2} direction="column">
                <Typography align="center" variant="h2">Create Your Account</Typography>
                <TextField required label="Email" variant="filled" type="email" value={registerInfo.email} onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
                <TextField required label="Password" variant="filled" type="password" value={registerInfo.password} onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} /> 
                <TextField required label="Confirm Password" variant="filled" type="password" value={registerInfo.confirm_password} onChange={(e) => setRegisterInfo({...registerInfo, confirm_password: e.target.value})} />
                <Button variant="contained" onClick={()=> onRegister()}>Create Account</Button>
            </Stack>
        </Container>
    )
}
