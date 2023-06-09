import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    Typography,
    Grid,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
  } from "@mui/material";

export const AddExercisePage = () => {
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('')
    const [date, setDate] = useState('')    

    const navigate = useNavigate()

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date }
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 201) {
            alert('Successfully added exercise')
        } else {
            alert(`One or More Field(s) empty - status code: ${response.status}`)
        }
        navigate('/')
    }

    return (
        <div>
            <Typography variant="h5" align="center" mb={2}>
              Add Your Exercise
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required 
                    fullWidth 
                    label="Date" 
                    name='date'
                    value = {date}
                    slotProps={{ textField: { variant: 'outlined' } }}
                    onChange={e => 
                      setDate(e.$d.toDateString())
                    } />
                  </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} align="center" mt={4}>
                    <Button onClick={addExercise} type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
        </div>
      );


}

export default AddExercisePage