const read = require('../utils/read');

let instructions = read(__dirname).split(/\n/g);

let pos = [0, 0];

const directions = [
	[1, 0],
	[0, -1],
	[-1, 0],
	[0, 1]
]

const changeDirection = (direction) => {
	if (direction < 0)
		direction += 4;
	else if (direction > 3)
		direction %= 4;
	return direction;
}

let currentDirection = 0;
for (let instruction of instructions) {
	let direction = instruction.substring(0, 1), steps = parseInt(instruction.substring(1));
	if (direction === 'F')
		pos.forEach((dir, i) => pos[i] += directions[currentDirection][i] * steps);
	else if (direction === 'N')
		pos[1] += steps;
	else if (direction === 'S')
		pos[1] -= steps;
	else if (direction === 'W')
		pos[0] -= steps;
	else if (direction === 'E')
		pos[0] += steps;
	else if (direction === 'L')
		currentDirection = changeDirection(currentDirection - (steps / 90))
	else if (direction === 'R')
		currentDirection = changeDirection(currentDirection + (steps / 90))
}

console.log(Math.abs(pos[0]) + Math.abs(pos[1]))

