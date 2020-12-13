const read = require('../utils/read');

let list = read(__dirname).split(/\n/g);

const timestamp = parseInt(list[0]);

const buses = list[1].split(',').filter(e => e !== 'x').map(e => parseInt(e));

const earliestBus = buses.reduce(
	(acc, bus) =>
		acc - timestamp % acc < bus - timestamp % bus
			? acc
			: bus
)

const result = (earliestBus - timestamp % earliestBus) * earliestBus
console.log(result)


