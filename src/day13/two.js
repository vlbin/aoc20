const read = require('../utils/read');
const { performance } = require('perf_hooks');

let list = read(__dirname).split(/\n/g);

const buses = [];

list[1]
	.split(',')
	.forEach((bus, index) => bus === 'x' ? '' : buses.push([parseInt(bus), index]))

const max = buses
	.reduce((prev, curr) => (parseInt(prev[0]) > parseInt(curr[0]) ? prev : curr))

let min = 100000000000000
let t = Math.floor(200 / max[0]) * max[0];
let [maxBus, maxIndex] = max;
while (true) {
	if (buses.every(bus => (t - maxIndex + bus[1]) % bus[0] === 0)) break;
	t += maxBus;
}

console.log(t - max[1])