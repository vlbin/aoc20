const read = require('../utils/read');

let data = read(__dirname).split('\r\n').map(x => parseInt(x)).sort();
let testData = [1721, 979, 366, 299, 675, 1456];
data.sort((a, b) => a - b);


// Complexity: O(n)
const A = (arr, target) => {
	let values = new Map();
	let result = null;
	arr.forEach((element, index) => {
		let remainder = target - element;
		if (values.has(remainder)) {
			result = element * remainder;
		}
		values.set(element, index);
	})
	return result;
}

const B = (arr, target) => {
	let values = new Map();
	let result = null;
	arr.forEach((x) => {
		arr.forEach((y, j) => {
			let remainder = target - x - y;
			if (values.has(remainder)) {
				result = remainder * x * y;
			}
			values.set(y, j);
		})
	})
	return result;
}

console.log(A(data, 2020));
console.log(B(data, 2020));