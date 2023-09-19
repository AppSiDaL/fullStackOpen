import express from "express";
import { calculateBmi, parseArguments } from "./bmiCalculator";
import { calculateExercises, validateArgs } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (_req, res) => {
  try {
    const { height, weight } = _req.query;
    const data = parseArguments([String(height), String(weight)]);
    const results: object = {
      height: data.height,
      weight: data.weight,
      bmi: calculateBmi(Number(height), Number(weight)),
    };
    res.json(results);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      console.log(error);
      errorMessage += " Error: " + error.message;
    }
    res.json({ error: errorMessage });
  }
});
app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  try {
    const { daily_exercises, target } = req.body;
    daily_exercises.unshift(target);
    const { period, goal } = validateArgs(daily_exercises);
    console.log(period);
    const result = calculateExercises(period, goal);

    return res.send({ result });
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.send({ error: errorMessage });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
