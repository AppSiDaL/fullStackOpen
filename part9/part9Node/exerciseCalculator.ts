interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export interface functionValuess {
  period: number[];
  goal: number;
}
export const validateArgs = (args: string[]): functionValuess => {
  let period: number[] = [];
  if (args.length < 2) throw new Error("Not enough arguments");
  for (let index = 1; index < args.length; index++) {
    if (!isNaN(Number(args[index]))) {
      period = period.concat(Number(args[index]));
    } else {
      throw new Error(`value provided ${args[index]} is not a number`);
    }
  }
  return {
    period,
    goal: Number(args[0]),
  };
};

export const calculateExercises = (period: number[], target: number): Results => {
  const trainingDays: number[] = period.filter((d) => d > 0);
  const ratingMap: { [key: number]: string } = {
    1: `Bad, you can do it so much better`,
    2: `Fine, buy you can do it better`,
    3: `Good, well done`,
  };

  const suma: number = period.reduce(
    (acumulador, valorActual) => acumulador + valorActual,
    0
  );
  const average: number = period.length > 0 ? suma / period.length : 0;

  const rating = Math.min(Math.max(Math.floor(average), 1), 3);
  const ratingDescription = ratingMap[rating];
  return {
    periodLength: period.length,
    trainingDays: trainingDays.length,
    success: trainingDays.length === period.length,
    rating,
    ratingDescription,
    target,
    average,
  };
};
try {
  const { period, goal } = validateArgs(process.argv);
  console.log(calculateExercises(period, goal));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
