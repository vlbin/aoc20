const read = require('../utils/read');

let list = read(__dirname).split(/\n/g).map(x => parseInt(x)).sort((a, b) => a - b);

let deviceJoltage = list[list.length - 1] + 3;

const A = () => {
	list.push(deviceJoltage);
	let oneJoltCounter = 0, threeJoltCounter = 0;

	let prev = 0;

	for (let element of list) {
		if (element - prev === 1) oneJoltCounter++;
		else if (element - prev === 3) threeJoltCounter++;

		prev = element;
	}
}

/*const valid_without = (list, index) => {
	let ads = [...list];
	let index = list.indexOf(index)
	ads.splice(index, 1);
	for (let i = index; i < index + 2; i++) {
		if (ads[i] - ads[i - 1] > 3) return false;
	}
	return true;
}
*/

let counter = 0;
const possible_combinations = (memo, set, val, max) => {
	if (memo.has(val)) return memo.get(val);

	if (val === max) return 1;
	let res = 0;
	for (let i = val + 1; i < val + 4; i++) {
		if (set.has(val)) {
			counter++;
			res += possible_combinations(memo, set, i, max)
		}
	}

	if (set.has(val)) memo[val] = res;

	return res;
}

B = () => {
	list.push(list[list.length - 1] + 3);
	list.unshift(0);
	console.log(possible_combinations(new Map(), new Set(list), 0, list[list.length - 1]))
}

B();