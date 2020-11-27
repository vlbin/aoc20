fs = require('fs');

const read = (day) => {
	const file = day.concat('/input.txt');
	return fs.readFileSync(file).toString().split('\r\n');
}

module.exports = read;