
const Parser = require('./src/parser.js'),
	fs = require('fs.promisify');

const parse = (path) => {
	return new Parser(path).toObject();
};

const toBitmap = (res) => {
	let char = {}, list = res.FONT.CHARS;
	for (let i in list) {
		char[i] = {
			offset: {x: list[i].BBX[2] || 0, y: list[i].BBX[3] || 0},
			width: list[i].BBX[0] || 0,
			height: list[i].BBX[1] || 0,
			bitmap: []
		};
		for (let x in list[i].BITMAP) {
			char[i].bitmap.push(list[i].BITMAP[x].toString(2).padStart(10, '0').split('').map((a) => Number(a)));
		}
	}
	return char;
};

module.exports = {
	parse: parse,
	bitmap: (p) => {
		return parse(p).then((res) => toBitmap(res));
	},
	bitmapSync: (p) => {
		if (Buffer.isBuffer(p)) {
			return toBitmap(parse(p));
		}
		return toBitmap(parse(fs.readFileSync(p)));
	}
};
