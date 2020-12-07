const read = require('../utils/read');

let groups = read(__dirname).split(/\n\n/g);


const A = (groups) => {
	groups = groups.map(group => group.replace(/\n/g, ''));
	let total = 0;

	for (let group of groups) {
		let groupSet = new Set();
		for (let char of group) {
			groupSet.add(char);
		}
		total += groupSet.size
	}
	return total;
}


const B = (groups) => {
	groups = groups.map(group => group.split(/\n/g));
	let total = 0;
	for (let group of groups) {
		let totalForGroup = 0;
		let map = new Map();
		for (let person of group) {
			for (let char of person) {
				if (map.get(char) != null)
					map.set(char, map.get(char) + 1)
				else
					map.set(char, 1)
			}
		}

		for (const [key, val] of map.entries()) {
			if (val === group.length) {
				totalForGroup++;
			}
		}
		total += totalForGroup;
	}
	return total;
}

console.log(A(groups));
console.log(B(groups));