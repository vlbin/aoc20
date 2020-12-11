const read = require('../utils/read');

let rows = read(__dirname).split(/\n/g);

let layout = rows.map(x => x.split(''));

let max = layout.length;

let occupied = 0;

const isOccupied = (x, y) => {
	return layout[x][y] === '#';
}

const isEmpty = (x, y) => {
	return layout[x][y] === 'L';
}

const willBeOccupied = (x, y) => {
	let i0 = x === 0 ? x : x - 1;
	let j0 = y === 0 ? y : y - 1;

	let imax = x + 1 === max ? x : x + 1;
	let jmax = y + 1 === max ? y : y + 1;

	for (let i = i0; i <= imax; i++) {
		for (let j = j0; j <= jmax; j++) {
			if (i === x || j === y) continue;
			if (isOccupied(i, j)) {
				return false
			}
		}
	}
	return true;
}

const willBeEmpty = (x, y) => {
	let i0 = x === 0 ? x : x - 1;
	let j0 = y === 0 ? y : y - 1;

	let imax = x + 1 === max ? x : x + 1;
	let jmax = y + 1 === max ? y : y + 1;
	let adjOccupied = 0;
	for (let i = i0; i <= imax; i++) {
		for (let j = j0; j <= jmax; j++) {
			if (isOccupied(i, j)) adjOccupied++;
		}
	}
	return adjOccupied >= 4;
}
let i = 0;
while (true) {
	const nextLayout = JSON.parse(JSON.stringify(layout));

	occupied = 0;
	for (let i = 0; i < max; i++) {
		for (let j = 0; j < max; j++) {
			if (isEmpty(i, j) && willBeOccupied(i, j)) nextLayout[i][j] = '#';
			else if (isOccupied(i, j) && willBeEmpty(i, j)) nextLayout[i][j] = 'L';
			if (isOccupied(i, j)) occupied++;
		}
	}
	if (i < 10)
		console.log(nextLayout)

	if (nextLayout === layout) {
		break;
	}

	i++;
	layout = JSON.parse(JSON.stringify(nextLayout));
}