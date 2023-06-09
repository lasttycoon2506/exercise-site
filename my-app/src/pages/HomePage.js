import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { MdEdit } from 'react-icons/md'
import {
  TableBody,
  TableRow,
  Table,
  TableHead,
  TableContainer,
  styled,
  Paper,
  tableCellClasses,
  TableCell,
  Typography,
  IconButton, 
  Button
} from "@mui/material";


function HomePage({ setExerciseToEdit }) {

    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newExercises = exercises.filter(ex => ex._id !== _id)
            setExercises(newExercises)
        } else {
            console.error(`Failed to delete exercise status code: ${response.status}`)
        }
    }

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        navigate('/edit-exercise')
    }

    const loadExercises = async () => {
        const response = await fetch("/exercises")
        const data = await response.json()
        setExercises(data)
    }

    useEffect(() => {
        loadExercises();
    }, []);


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  return (
    <TableContainer component={Paper}>
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h3"
          id="tableTitle"
          component="div"
          align='center'
        >
          Your Exercises
        </Typography>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'> Name </StyledTableCell>
            <StyledTableCell align="center">Reps</StyledTableCell>
            <StyledTableCell align="center">Weight</StyledTableCell>
            <StyledTableCell align="center">Unit (LB / KG)</StyledTableCell>
            <StyledTableCell align="center">Date</StyledTableCell>    
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>    
            </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <StyledTableRow key={exercise}>
              <StyledTableCell component="th" scope="row" align='center'>  {exercise.name}  </StyledTableCell>
              <StyledTableCell align="center">{exercise.reps}</StyledTableCell>
              <StyledTableCell align="center">{exercise.weight}</StyledTableCell>
              <StyledTableCell align="center">{exercise.unit}</StyledTableCell>
              <StyledTableCell align="center">{exercise.date}</StyledTableCell>
              <StyledTableCell align='center'> 
              <Button
                  onClick={() => {
                    onEdit(exercise);
                  }}
                >
                  <IconButton aria-label="edit" size="large">
                  <MdEdit />
                </IconButton>
              </Button> 
              </StyledTableCell>
              <StyledTableCell align='center'>
              <Button
                  onClick={() => {
                    onDelete(exercise._id);
                  }}
                >
                  <IconButton aria-label="delete" size="large">
                  <DeleteIcon />
                </IconButton>
              </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))} 
        </TableBody>
      </Table>
      <Typography align='center'
          >  <Button
          onClick={() => {
            navigate('/add-exercise')
          }}
          variant="contained"
          size='large'
        >
          Add
      </Button>
        </Typography>
    </TableContainer>
  );
}


export default HomePage