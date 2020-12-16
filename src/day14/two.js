const read = require('../utils/read');
const { performance } = require('perf_hooks');

let list = read(__dirname).split(/\n/g);

const mem = new Map();

const bitmask = (value, mask) => {
	const address = value.toString(2).padStart(36, '0').split('');
	mask = mask.split('');
	let floating = mask.map((bit, i) => bit === '0' ? address[i] : bit);
	let nFloats = floating.filter(bit => bit === 'X').length;

	return Array
		.from({length: Math.pow(2, nFloats)})
		.map((_, i) => {
			const combination = i.toString(2).padStart(nFloats, '0').split('');
			const float = floating.map((bit) => bit === 'X' ? combination.shift() : bit);

			return parseInt(float.join(''), 2);
		})
}

let t1 = performance.now()
list.forEach((row, index) => {
	if (row.startsWith('mask')) {
		let mask = row.substring(row.indexOf('=') + 2)
		let instr_index = index + 1;
		let instr = list[instr_index];
		while (instr_index < list.length) {
			if (instr.startsWith('mask')) break;
			let instr_value = parseInt(instr.substring(instr.indexOf('= ') + 2))
			let mem_index = parseInt(instr.substring(instr.indexOf('[') + 1, instr.indexOf(']')));
			let addresses = bitmask(mem_index, mask);

			addresses.forEach(address => {
				mem.set(address, instr_value)
			})
			instr_index++;
			instr = list[instr_index];
		}
	}
})

let sum = [...mem.values()].reduce((acc, curr) => acc + curr, 0)
let t2 = performance.now()
console.log(sum, t2 - t1);