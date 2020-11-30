const read = require('../../utils/read');
const intcode = require('../intcode');

const data = read(__dirname).split(',');
const test = '1,9,10,3,2,3,11,0,99,30,40,50'.split(',');

const input = data.map(x => parseInt(x));

const one = () => {
	input[1] = 12;
	input[2] = 2;
	const output = intcode(input, 0);
}

const oneToNArray = (n) => [...Array(n+1).keys()].slice(1);

const two = () => {
	const arr1 = oneToNArray(99);
	const arr2 = arr1;
	arr1.forEach((i) => {
		arr2.forEach(j => {
			if (testInputs(i, j, input)) console.log(i, j);
		})
	});
}

const testInputs = (input1, input2, copiedInput) => {
	copiedInput[1] = input1;
	copiedInput[2] = input2;
	console.log(intcode(input, 0)[0]);
}

two();