const read = require('../utils/read');
const { performance } = require('perf_hooks');

let list = read(__dirname).split(/\n/g);

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => (a * b) / gcd(a, b);

const buses = [];

list[1]
	.split(',')
	.forEach((bus, index) => bus === 'x' ? '' : buses.push([parseInt(bus), index]))

const max = buses
	.reduce((prev, curr) => (parseInt(prev[0]) > parseInt(curr[0]) ? prev : curr))

let min = 100000000000000
let t = Math.floor(min / max[0]) * max[0];
let [maxBus, maxIndex] = max;
let m = maxBus;
let t1 = performance.now();
for (let i = 0; i < buses.length; i++) {
	const routes = buses.slice(0, i + 1);
	while (!routes.every(([bus, index]) => (t - maxIndex + index) % bus === 0)) {
		t += m;
	}
	m = routes.reduce((m, [bus]) => lcm(m, bus), m);
}

let t2 = performance.now()

console.log(t - max[1], t2 - t1)