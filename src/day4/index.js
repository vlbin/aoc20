const read = require('../utils/read');

let data = read(__dirname).split(/\n\n/g);

let passports = data
	.map(passport => passport
		.replace(/\n/g, ' ')
		.split(' ')
		.reduce((result, item) => result.set(item.substring(0,3), item.substring(4)), new Map()));

let required = {
	byr: (value) => parseInt(value) >= 1920 && parseInt(value) <= 2002,
	iyr: (value) => parseInt(value) >= 2010 && parseInt(value) <= 2020,
	eyr: (value) => parseInt(value) >= 2020 && parseInt(value) <= 2030,
	hgt: (value) => {
		let unit = value.slice(-2);
		value = value.slice(0, -2);
		return unit === 'cm' ? value >= 150 && value <= 193 : value >= 59 && value <= 76
	},
	hcl: (value) => (/^#[0-9A-F]{6}$/i.test(value)) && value.length === 7,
	ecl: (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
	pid: (value) => value.length === 9 && !isNaN(value),
};

const A = () => {
	let validPassports = passports.filter((passport) => {
		for (let field of Object.keys(required)) {
			let res = passport.get(field);
			if (res == null) {
				return false;
			}
		}
		return true;
	});

	return validPassports.length;
}

const B = () => {
	let validPassports = passports.filter((passport) => {
		for (let field of Object.keys(required)) {
			let res = passport.get(field);
			if (res == null || !required[field](res)) {
				return false;
			}
		}
		return true;
	});

	return validPassports.length;
}

console.log(A())
console.log(B())