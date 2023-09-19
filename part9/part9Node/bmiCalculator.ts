interface BMIValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 1) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const BMI: number = weight / Math.pow(height / 100, 2);
  if (BMI < 18.5) {
    return `Inferior (under weight)`;
  } else if (BMI < 24.9) {
    return `Normal (healthy weight)`;
  } else if (BMI < 29.9) {
    return `Overweight (over weight)`;
  } else {
    return `Obesity (over weight)`;
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
