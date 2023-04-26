import React from 'react'
import { Typography, Button, TextField, Container } from '@mui/material'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useState } from 'react';
import supabase from '../config/SupabaseClient';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const field = {
    marginBottom: 20,
    marginTop: 20,
    display: 'block'


}
function Login() {
    const navigate = useNavigate()
    const [details, setDetails] = useState({
        email: '',
        password: ''

    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: details.email,
            password: details.password,
        })
        if (error) {
            toast.error('Something went wrong')
            console.log(error)
            return;
        }
        if (data) {
            toast.success('User LoggedIn Successfully')
            console.log(data);
            setTimeout(() => {
                navigate('/')
                // reload the page
                window.location.reload();

                
            }, 1);
        }

    }
    return (
        <Container>
            <Typography variant="h4" component="h2" align='center' gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit} >
                <TextField
                    color='secondary'
                    style={field}
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Enter Email"
                    variant="standard"
                    onChange={(e) => { setDetails({ ...details, email: e.target.value }) }}
                />
                <TextField
                    color='secondary'
                    style={field}
                    type='password'
                    fullWidth
                    required
                    id="outlined-basic"
                    label="Enter Password"
                    variant="standard"
                    onChange={(e) => { setDetails({ ...details, password: e.target.value }) }}
                />
                <Button
                    // style={btn}
                    type='submit'
                    color='primary'
                    variant='contained'
                    endIcon={<KeyboardArrowRightOutlinedIcon />}
                >
                    Submit
                </Button>


            </form>
            <ToastContainer />
        </Container>

    )
}

export default Login