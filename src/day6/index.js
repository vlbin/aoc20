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
		let all_yes = group[0].split('');
		for (let answers of group.slice(1)) {
			all_yes = all_yes.filter(val => answers.split('').includes(val));
		}
		total += all_yes.length;
	}
	return total;
}

console.log(A(groups));
console.log(B(groups));