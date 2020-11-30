const intcode = (input, index) => {
	const operators = [1, 2];
	const operator = input[index];
	if (operators.includes(operator)) {
		const val1 = input[input[index + 1]];
		const val2 = input[input[index + 2]];
		const outputPos = input[index + 3];
		if (operator === 1) {
			input[outputPos] = val1 + val2;
		} else {
			input[outputPos] = val1 * val2;
		}
	} else if (operator === 99) {
		return input;
	}
	return intcode(input, index + 4);
}

module.exports = intcode;

