
const Parser = require('./src/parser.js');

const parse = (path) => {
	return new Parser(path).toObject();
};

module.exports = {
	parse: parse,
	bitmap: (p) => {
		return parse(p).then((res) => {
			let char = {}, list = res.FONT.CHARS;
			for (let i in list) {
				char[i] = [];
				for (let x in list[i].BITMAP) {
					char[i].push(list[i].BITMAP[x].toString(2).padStart(10, '0').split('').map((a) => Number(a)));
				}
			}
			return char;
		});
	}
};
