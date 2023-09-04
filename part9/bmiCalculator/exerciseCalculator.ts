//average time of daily exercise hours
//compare it to the target amount of daily hours
// returns an object that includes:
/* 1. the number of days
    2. the number of training days
    3. the original target value
    4. the calculated average time
    5. boolean value describing if the target was reached
    6. a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
    7. a text value explaining the rating, you can come up with the explanations*/
// The daily exercise hours are given to the function as an array
// that contains the number of exercise hours for each day in the training period.
// For the Result object, you should create an interface.
export interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], targetAmount: number): ExerciseResult => {

    const periodLength = dailyHours.length;
    const totalHours = dailyHours.reduce((a, b) => a + b, 0);
    const averageHoursDay = totalHours / periodLength;
    const success = averageHoursDay >= targetAmount;
    const totalDaysWithTraining = dailyHours.filter(hoursDay => hoursDay > 0).length;

    let rating;
    let ratingDescription;
    if (averageHoursDay >= targetAmount) {
        rating = 3;
        ratingDescription = "Excellent";
    } else if (averageHoursDay >= targetAmount * 0.5) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "Need to work more, bellow the minimum required";
    }

    const result = {
        periodLength: periodLength,
        trainingDays: totalDaysWithTraining,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetAmount,
        average: averageHoursDay,
    };
    return result;
};
export default calculateExercises;
/*
const argsExerciseCalculator = process.argv.slice(2);

if (argsExerciseCalculator.length < 2) {
    console.log('You need to provide at least 2 arguments: target and daily exercise hours');
    process.exit(1);
}

const [target, ...dailyHours] = argsExerciseCalculator.map(Number);

if (isNaN(target) || dailyHours.some(hour => isNaN(hour))) {
    console.log('All arguments should be numbers');
    process.exit(1);
}

console.log(calculateExercises(dailyHours, target));*/
