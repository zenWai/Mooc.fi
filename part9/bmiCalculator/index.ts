import express from 'express';
import calculateBmi from "./bmiCalculator";
import calculateExercises, {ExerciseResult} from "./exerciseCalculator";

const app = express();
app.use(express.json());
const PORT = 3003;

app.get('/Hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get("/bmi", (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    const bmi = calculateBmi(height, weight);

    return res.json({
        weight,
        height,
        bmi,
    });
});

app.post('/exercises', (req, res) => {

    const {daily_exercises, target} = req.body;

    // Validate parameters
    if (!daily_exercises || !target) {
        return res.status(400).json({error: 'parameters missing'});
    }

    if (!Array.isArray(daily_exercises) || typeof target !== 'number' || daily_exercises.some(d => typeof d !== 'number')) {
        return res.status(400).json({error: 'malformatted parameters'});
    }

    const result: ExerciseResult = calculateExercises(daily_exercises, target);

    return res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});