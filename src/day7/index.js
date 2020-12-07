const read = require('../utils/read');

let rules = read(__dirname).split(/\n/g);

const containsColor = (color, holders) => {
	for (let rule of rules) {
		if (rule.includes(color) && !rule.startsWith(color)) {
			holders.add(rule.split(' ').slice(0, 2).join(' '));
			containsColor(rule.split(' ').slice(0, 2).join(' '), holders);
		}
	}
	return holders.size;
}

const bagMap = () => {
	let map = new Map();
	for (let rule of rules) {
		let bag = rule.split(' ').slice(0, 2).join(' ');
		let innerBags = rule.replace(/[.,]/g, '').split(' ').slice(4).join(' ').split(/bag{1}s?/g).map(x => x.trim()).filter(x => x.length > 0);
		if (!map.has(bag)) map.set(bag, Array())
		for (let innerBag of innerBags) {
			if (innerBag !== 'no other') {
				let key = innerBag.substring(2);
				let val = innerBag.substring(0, 1);
				map.get(bag).push({[key]: val})
			}
		}
	}
	return map;
}

const sumBags = (map, bag) => {
	let list = map.get(bag);
	return 1 + (list.reduce((acc, bag) => acc + Object.values(bag)[0] * sumBags(map, Object.keys(bag)[0]), 0));
}

const A = () => containsColor('shiny gold', new Set());

const B = () => sumBags(bagMap(), 'shiny gold') - 1;

console.log(A());
console.log(B());