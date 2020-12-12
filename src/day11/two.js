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
		// we need to check until we find an occupied seat in the direction
		while (x2 >= 0 && x2 <= maxrow && y2 >= 0 && y2 <= maxcol) {
			// position is only of interest if it's not a floor seat
			if (state[x2][y2] !== '.') {
				// we found an occupied seat!
				if (state[x2][y2] === '#')
					total+= 1;
				// we either found an occupied seat and incremented or we found a free seat and we can't see through those
				break;
			}
			// check the next position in the direction
			x2 += dx; y2 += dy;
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
				else if (spot === '#' && occupied >= 5)
					state[i][j] = 'L';
			}
		}
		if (flatten(state) === flatten(previous)) return [].concat(...state).filter(x => x === '#').length;
		previous = state;
	}
}

let occupied = iteration(layout);
console.log(occupied)