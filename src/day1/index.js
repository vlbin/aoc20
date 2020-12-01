const read = require('../utils/read');

let data = read(__dirname).split('\r\n').map(x => parseInt(x)).sort();
let testData = [1721, 979, 366, 299, 675, 1456];
data.sort((a, b) => a - b);


// Complexity: O(n)
const A = (arr, target) => {
	let values = new Map();
	for (let [index, element] of arr.entries()) {
		let remainder = target - element;
		if (values.has(remainder)) {
			return element * remainder;
		}
		values.set(element, index);
	}
}

const B = (arr, target) => {
	let values = new Map();
	for (let x of arr) {
		for (let [index, y] of arr.entries()) {
			let remainder = target - x - y;
			if (values.has(remainder)) {
				return remainder * x * y;
			}
			values.set(y, index);
		}
	}
}

console.log(A(data, 2020));
console.log(B(data, 2020));