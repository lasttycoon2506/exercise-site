import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { themeSettings } from "./theme.js";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import HomePage from './pages/HomePage'
import AddExercisePage from './pages/AddExercisePage'
import EditExercisePage from './pages/EditExercisePage'
import React, { useState, useMemo } from 'react'


function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
    const [exerciseToEdit, setExerciseToEdit] = useState()
    
    return (
        <div className="app">
          <BrowserRouter>
          <ThemeProvider theme={theme}>
          <CssBaseline />
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage setExerciseToEdit={setExerciseToEdit}/> }
                />
                <Route
                  path="/add-exercise"
                  element=
                    { <AddExercisePage />}
                />
                <Route
                  path="/edit-exercise"
                  element=
                    {<EditExercisePage exerciseToEdit={exerciseToEdit} />}
                />
              </Routes>
              </ThemeProvider>
          </BrowserRouter>
        </div>
      );
}

export default App