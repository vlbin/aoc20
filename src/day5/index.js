const read = require('../utils/read');
const { performance } = require('perf_hooks');

let passes = read(__dirname).split(/\n/g);

const readBinary = (seq, lo, hi, lower, higher) => {
	seq = seq.split('');
	let mid = Math.floor((lo + hi) / 2);
	for (let instr of seq) {
		mid = Math.floor((lo + hi) / 2);
		if (instr === lower) {
			hi = mid;
		} else if (instr === higher) {
			lo = mid + 1;
		}
		if (lo === hi)  {
			return lo;
		}
	}
}

const seats = () => {
	let seats = [];
	for (let pass of passes) {
		let row = readBinary(pass.slice(0, -3), 0, 127, 'F', 'B')
		let col = readBinary(pass.slice(-3), 0, 7, 'L', 'R')
		let seatID = row * 8 + col;
		seats.push(seatID);
	}
	return seats;
}

const A = (list) => list.reduce((a, b) => Math.max(a, b));

const B = (list) => {
	for (let seat of list) {
		if (!list.includes(seat + 1) && list.includes(seat + 2))
			return seat + 1;
	}
}
let t0 = performance.now();
console.log(A(seats()));
let ta = performance.now() - t0;
t0 = performance.now();
console.log(B(seats()));
let tb = performance.now() - t0;
console.log(ta, tb);