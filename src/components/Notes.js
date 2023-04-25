import React from 'react'
import { useState, useEffect } from 'react'
import { Container } from '@mui/material';
import NoteCard from './NoteCard';
import Masonary from 'react-masonry-css'
import supabase from '../config/SupabaseClient';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Notes() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState('Anonymous');
  const fetchNotes = async () => {

    const { data, error } = await supabase
      .from('Todo')
      .select()
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setNotes(data);
  }
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
      setUser(user.user_metadata.username)
      

    }
    else{
      console.log('no user');
    }
  }

    

  useEffect(() => {
    fetchNotes();
    fetchUser();
    
  }, [])

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('Todo')
      .delete()
      .eq('id', id)
    if (error) {
      toast.error('Something went wrong')
      return;
    }
    toast.success('Note Deleted Successfully')


    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };




  return (
    <>
      <Container>
        {/* <Grid container>
          <Grid item xs={12} sm={6}  md={3} >
            <Paper>1</Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}  >
            <Paper>2</Paper>
          </Grid>
          <Grid  item xs={12} sm={6} md={3} >
            <Paper>3</Paper>
          </Grid>
          <Grid item xs={12} sm={6}  md={3} >
            <Paper>4</Paper>
          </Grid>
        </Grid> */}



        <Masonary
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {notes && notes.map(note => (

            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />

            </div>
          ))}
        </Masonary>

      </Container>
      <ToastContainer />
    </>
  )
}

export default Notes