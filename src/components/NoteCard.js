import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Avatar } from '@mui/material';


const avatarStyle = (note) => {
    if (note.category === 'Todos') {
        return { background: 'red' }
    }
    else if (note.category === 'Reminders') {
        return { background: 'green' }
    }
    else if (note.category === 'Work') {
        return { background: 'blue' }
    }
    else {
        return { background: 'yellow' }
    }
}

function NoteCard({note,handleDelete}) {
  return (
    <>
    <div>
        <Card elevation={1}>
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" style={avatarStyle(note)} >
                  {note.category[0].toUpperCase()}
                </Avatar>
              }
              
            action={
                <IconButton onClick={()=>handleDelete(note.id)} >
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
              }
              title={note.title}
            subheader={note.category}

              
             />
             <CardContent>
                <Typography variant='body1' color='textSecondary' >
                    {note.description}
                </Typography>

            </CardContent>
                
        </Card>
    </div>
    </>
  )
}

export default NoteCard