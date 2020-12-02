const read = require('../utils/read');

let passwords = read(__dirname).split('\r\n');

const A = (passwords) => {
	let counter = 0;
	for (let password of passwords) {
		let min = parseInt(password.substring(0, password.indexOf('-')));
		let max = parseInt(password.substring(password.indexOf('-') + 1, password.indexOf(' ')));
		let letter = password.substring(password.indexOf(':') - 1, password.indexOf(':'));
		let word = password.substring(password.indexOf(':') + 2);
		let occurrence = word.split(letter).length - 1;
		if (occurrence >= min && occurrence <= max) counter++;
	}
	console.log(counter)
}

const B = (passwords) => {
	let counter = 0;
	for (let password of passwords) {
		let index1 = parseInt(password.substring(0, password.indexOf('-')));
		let index2 = parseInt(password.substring(password.indexOf('-') + 1, password.indexOf(' ')));
		let letter = password.substring(password.indexOf(':') - 1, password.indexOf(':'));
		let word = password.substring(password.indexOf(':') + 2);
		if ((word[index1 - 1] === letter) !== (word[index2 - 1] === letter)) counter++;
	}
	console.log(counter);
}

A(passwords);
B(passwords);