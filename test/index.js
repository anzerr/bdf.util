
const {bitmap} = require('../index.js'),
	bmp = require('bmp.util'),
	fs = require('fs.promisify');

// the font used in this test was taken from https://github.com/turquoise-hexagon/cherry

bitmap('./test/cherry-10-b.bdf').then((char) => {
	/*let count = Object.keys(char).length;

	let max = Math.ceil(Math.sqrt(count));
	const map = new Map({
		width: 10 * max,
		height: 10 * (max + 3),
		mask: {r: 3, g: 2, b: 1, a: 0}
	});

	let draw = (key, x, y) => {
		for (let i in char[key].bitmap) {
			for (let v in char[key].bitmap[i]) {
				if (char[key].bitmap[i][v]) {
					map.fill(x + Number(i), y + Number(v), {r: 255, g: 255, b: 255}, 1);
				}
			}
		}
	};

	let cur = 0;
	for (let i in char) {
		let pos = {
			x: Math.floor(cur / max) * 10,
			y: (cur % max) * 10
		};
		draw(i, pos.x, pos.y);
		cur++;
	}
	let text = Buffer.from('Hello World!');
	for (let i = 0; i < text.length; i++) {
		draw(text[i], map.height - 20, 10 + (i * 10));
	}

	return map;*/
}).then((map) => {

	/* return fs.writeFile('./test/example.bmp', bmp.encode({
		width: map.width,
		height: map.height,
		endian: true,
		data: map.toBuffer()
	}).data);*/
}).catch(console.log);
