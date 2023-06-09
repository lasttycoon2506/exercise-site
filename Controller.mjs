import express from 'express'
import * as exercises from './Model.mjs'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {
    exercises.retrieveExercises()
        .then(exercises => {
            res.json(exercises)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'No exercises exist' })
        })
})


app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ Error: 'Missing Required Field(s)' })
        })
})


app.get('/exercises', (req, res) => {
    exercises.retrieveExercises()
        .then(exercises => {
            res.json(exercises)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'No exercises exist' })
        })
})


app.put('/exercises/:_id', (req, res) => {
    exercises.updateExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(500).json({ Error: 'No Update made' })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: 'Exercise does not exist' });
        })
});


app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send()
            } else {
                res.status(500).json({ Error: 'Exercise not found' })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500)({ error: 'Exercise not found' })
        })
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});