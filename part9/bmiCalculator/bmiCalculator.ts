const calculateBmi = (heightCm: number, weightKg: number): string => {
    const heightInMeters = heightCm / 100;
    const bmi = weightKg / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 25) {
        return "Overweight";
    }
    return "Normal (healthy weight)";
};

/*const argsBMICalculator = process.argv.slice(2);

if (argsBMICalculator.length !== 2) {
    console.log('You need to provide exactly 2 arguments for height and weight');
    process.exit(1);
}

const [height, weight] = argsBMICalculator.map(Number);

if (isNaN(height) || isNaN(weight)) {
    console.log('Both height and weight should be numbers');
    process.exit(1);
}*/

/*console.log(calculateBmi(height, weight));*/

export default calculateBmi;