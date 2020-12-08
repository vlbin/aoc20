const read = require('../utils/read');

let data = read(__dirname).split(/\n/g);

let acc = 0;

const getOperation = (step) => step.substring(0, 3)

const getArgument = (step) => step.substring(4).charAt(0) === '-' ? (-1 * parseInt(step.substring(5))) : parseInt(step.substring(5))

const asm = (steps) => {
	let pc = 0;
	let performedOperations = [];
	acc = 0;
	while (pc !== steps.length) {
		performedOperations.push(pc)
		let step = {
			operation: getOperation(steps[pc]),
			argument: getArgument(steps[pc])
		};
		switch (step.operation) {
			case 'jmp':
				pc += step.argument;
				break;
			case 'acc':
				acc += step.argument
				pc += 1;
				break;
			case 'nop':
				pc += 1;
				break;
		}
		if (performedOperations.includes(pc)) {
			return false
		}
	}
	return true;
}

const A = () => {
	asm(data);
	return acc;
}

const B = () => {
	let index = -1;
	let toChange = 0;
	while (true) {
		toChange = data.findIndex((e, i) => {
			e = getOperation(e)
			return i > index && (e === 'nop' || e === 'jmp')
		})
		if (toChange < 0) break;
		let steps = [...data];
		if (steps[toChange].includes('jmp')) {
			steps[toChange] = steps[toChange].replace('jmp', 'nop');
		} else if (steps[toChange].includes('nop')) {
			steps[toChange] = steps[toChange].replace('nop', 'jmp');
		}
		if (asm(steps)) {
			return acc;
		}
		index = toChange;
	}
}

console.log(A());
console.log(B());