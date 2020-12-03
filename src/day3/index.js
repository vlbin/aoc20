const read = require('../utils/read');

let matrix = read(__dirname).split('\r\n').map(x => x.split(''));

const calcSlope = (down, across) => {
	let coords = {
		x: 0,
		y: 0,
	}
	let treesForSlope = 0;
	while (coords.y < matrix.length - 1) {
		coords.x += across;
		coords.y += down;
		if (matrix[coords.y][coords.x % matrix[0].length] === '#') {
			treesForSlope++;
		}
	}
	return treesForSlope;
}

const A = () => calcSlope(1, 3);

const B = () => {
	let slopes = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2],
	];
	let result = 1;
	slopes.forEach(slope => result *= calcSlope(slope[1], slope[0]))
	return result;
}

console.log(A())
console.log(B())