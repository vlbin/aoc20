const read = require('../utils/read');

const input = read(__dirname);

const fuelCalculator = (mass) => Math.floor(mass / 3) - 2

const recursiveFuelCalculator = (mass) => {
	const fuel = fuelCalculator(mass)
	if (fuel > 0)
		return fuel + recursiveFuelCalculator(fuel)
	return 0;
}

const one = input
	.map(x => fuelCalculator(x))
	.reduce((total, current) => total + current)

const two = input
		.map(x => recursiveFuelCalculator(x))
		.reduce((total, current) => total + current)

console.log(one, two)
