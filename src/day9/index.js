const read = require('../utils/read');

let list = read(__dirname).split(/\n/g).map(x => parseInt(x));

const isValid = (list, i, preamble) => {
	if (i < preamble) return true;
	let n1 = list[i];
	list = [...list].slice(i - preamble, i).map(x => parseInt(x));
	let set = new Set();
	for (let n2 of list) {
		if (set.has(n2)) {
			return true;
		}
		set.add(n1 - n2);
	}
	return false;
}

const getFirstInvalid = (list, preamble) => {
	for (let [i, e] of list.entries()) {
		if (!isValid(list, i, preamble)) {
			return list[i];
		}
	}
	return null;
}

const sum = (list, start, terms) => {
	list = [...list].slice(start, start + terms);
	return list.reduce((a, b) => a + b, 0);
}

const A = () => getFirstInvalid(list, 25)

const B = () => {
	let target = getFirstInvalid(list, 25);
	let numbers = 2;
	while (numbers < list.length) {
		for (let [i, e] of list.entries()) {
			if (sum(list, i, numbers) === target) {
				let range = list.slice(i, i + numbers);
				return Math.min(...range) + Math.max(...range)
			}
		}
		numbers++;
	}
	return 0;
}

console.log(A());
console.log(B());