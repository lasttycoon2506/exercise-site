import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Typography,
    Grid,
    Button,
    TextField,
    MenuItem,
    InputLabel,
    Select
  } from "@mui/material";

export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    const [date, setDate] = useState(exerciseToEdit.date)

    const navigate = useNavigate()

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date }
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 200) {
            alert('Successfully edited exercise')
        } else {
            alert(`Failed to edit exercise status code: ${response.status}`)
        }
        navigate('/')
    }

    return (
        <div>
            <Typography variant="h5" align="center" mb={2}>
              Edit Your Exercise
            </Typography>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      label="Name"
                      name="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      label="Reps"
                      name="reps"
                      value={reps}
                      onChange={e => setReps(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      label="Weight"
                      name="weight"
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <InputLabel>Units</InputLabel>
                    <Select
                      required
                      fullWidth
                      label="Unit"
                      name="unit"
                      type="text"
                      value={unit}
                      onChange={e => setUnit(e.target.value)}
                    >
                      <MenuItem value="LB">LB</MenuItem>
                      <MenuItem value="KG">KG</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      label="Date"
                      name="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} align="center" mt={4}>
                    <Button onClick={editExercise} type="submit" variant="contained" color="primary" size='large'>
                      Edit
                    </Button>
                  </Grid>
                </Grid>
        </div>
      );
}

export default EditExercisePage