import { React, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button, Container, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel
} from '@mui/material';



import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/SupabaseClient';

const field = {
    marginBottom: 20,
    marginTop: 20,
    display: 'block'


}
function Create() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Todos'
    })
    const [error, setError] = useState({
        title: false,
        description: false,
    })
    const handleSubmit = async (e) => {


        e.preventDefault();
        if (data.title === '') {
            setError({ title: true })
        }
        if (data.description === '') {
            setError({ description: true })
        }


        if (data.title && data.description) {

            const { error } = await supabase
                .from('Todo')
                .insert({ title: data.title, description: data.description, category: data.category })
            if (error) {
                toast.error('Something went wrong')
                console.log(error)
                return;




            }
            toast.success('Note Added Successfully')
            setTimeout(() => {
                navigate('/')
                
            }, 2000);
            
        }

    }
    return (
        <>
            <Container>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        error={error.title}
                        style={field}
                        id="outlined-basic"
                        label="Note Title"
                        color='secondary'
                        fullWidth required
                        variant="outlined"
                        onChange={(e) => { setData({ ...data, title: e.target.value }) }}
                        value={data.title}
                    />
                    <TextField
                        error={error.description}
                        style={field}
                        id="outlined-basic"
                        label="Description"
                        multiline rows='4'
                        color='secondary'
                        fullWidth required
                        variant="outlined"
                        onChange={(e) => { setData({ ...data, description: e.target.value }) }}
                        value={data.description}
                    />
                    <FormControl style={field} >
                        <FormLabel color='secondary' >Category</FormLabel>
                        <RadioGroup row value={data.category} onChange={
                            (e) => { setData({ ...data, category: e.target.value }) }
                        } >
                            <FormControlLabel control={<Radio color='secondary' />} label="Money" value="Money" />
                            <FormControlLabel control={<Radio color='secondary' />} label="Todos" value="Todos" />
                            <FormControlLabel control={<Radio color='secondary' />} label="Reminders" value="Reminders" />
                            <FormControlLabel control={<Radio color='secondary' />} label="Work" value="Work" />
                        </RadioGroup>
                    </FormControl>

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
            </Container>
            <ToastContainer />




        </>
    )
}

export default Create