const read = require('../utils/read');

let rows = read(__dirname).split(/\n/g);

let layout = rows.map(x => x.split(''));

const maxrow = layout.length - 1, maxcol = layout[0].length - 1;

const adjMatrix = [[-1, 0], [ 1,  0], [0, 1], [ 0, -1],
[-1, 1], [-1, -1], [1, 1], [ 1, -1]]

const flatten = (layout) => layout.map(x => x.join('')).join('\n');
const occupiedNeighbors = (state, x, y) => {
	let total = 0;
	for (let [dx, dy] of adjMatrix) {
		let x2 = dx + x, y2 = dy + y;
		if (x2 >= 0 && x2 <= maxrow && y2 >= 0 && y2 <= maxcol) {
			total += state[x2][y2] === '#'
		}
	}
	return total;
}

const iteration = (state) => {
	while (true) {
		let previous = JSON.parse(JSON.stringify(state));
		for (let [i, row] of state.entries()) {
			for (let [j, spot] of row.entries()) {
				if (spot === '.') continue;
				let occupied = occupiedNeighbors(previous, i, j);
				if (spot === 'L' && occupied === 0)
					state[i][j] = '#';
				else if (spot === '#' && occupied >= 4)
					state[i][j] = 'L';
			}
		}
		if (flatten(state) === flatten(previous)) return [].concat(...state).filter(x => x === '#').length;
		previous = state;
	}
}

let occupied = iteration(layout);
console.log(occupied)