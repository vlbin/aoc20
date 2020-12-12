const read = require('../utils/read');

let instructions = read(__dirname).split(/\n/g);

let shipPos = [0, 0];
let waypointPos = [10, 1];

const deg2rad = (degrees) => {
	let pi = Math.PI;
	return degrees * (pi / 180);
}

const rotateWaypoint = (pos, dir, ang) => {
	ang = dir === 'L' ? -ang : ang;
	ang = -ang * (Math.PI / 180);
	let cos = Math.cos(ang);
	let sin = Math.sin(ang);
	return [Math.round(10000 * (pos[0] * cos - pos[1] * sin)) / 10000, Math.round(10000 * (pos[0] * sin + pos[1] * cos)) / 10000];
};

let currentDirection = 0;
for (let instruction of instructions) {
	let direction = instruction.substring(0, 1), steps = parseInt(instruction.substring(1))
	if (direction === 'F')
		shipPos.forEach((dir, i) => shipPos[i] += waypointPos[i] * steps);
	else if (direction === 'N')
		waypointPos[1] += steps;
	else if (direction === 'S')
		waypointPos[1] -= steps;
	else if (direction === 'W')
		waypointPos[0] -= steps;
	else if (direction === 'E')
		waypointPos[0] += steps;
	else if ('LR'.includes(direction))
		waypointPos = rotateWaypoint([...waypointPos], direction, steps)
}

console.log(Math.abs(shipPos[0]) + Math.abs(shipPos[1]))

