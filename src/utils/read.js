fs = require('fs');

const read = (day) => {
	const file = day.concat('/input.txt');
	return fs.readFileSync(file).toString();
}

module.exports = read;