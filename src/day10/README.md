## Part 2

We know that the first and last positions are immutable, they will be 0 and max + 3 respective.

For every other element, we need to look if it is crucial

0 1 4 5 6 7 10 11 12 15 16 19 22




const memoize = fn => {
	let cache = {};
	return (...args) => {
		let data = JSON.stringify(args);
		return cache[data] = cache[data] || fn(...args);
	}
} 