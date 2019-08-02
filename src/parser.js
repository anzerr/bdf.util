
const fs = require('fs.promisify');

class Parser {

	constructor(p) {
		this.path = p;
	}

	find(list, i, end) {
		let o = {}, k = new RegExp(`^END${end}`);
		while (list[i]) {
			if (list[i].trim() === 'BITMAP') {
				let v = [];
				i++;
				while (list[i].match(/^[0-9A-Fa-f]+$/)) {
					v.push(parseInt(list[i], 16));
					i++;
				}
				o.BITMAP = v;
			}
			if (list[i].match(/^START/)) {
				let key = list[i].replace(/^START/, ''), parts = this.find(list, i + 1, key.match(/[A-Za-z]*/)[0]);
				if (key.match(/^CHAR\s.+$/)) {
					if (typeof o.CHARS !== 'object') {
						o.CHARS = {};
					}
					o.CHARS[key.replace(/^CHAR\schar/, '')] = parts[0];
					i = parts[1];
				} else {
					o[key.replace(/\s.*?$/, '')] = parts[0];
					i = parts[1];
				}
			}
			if (list[i].match(k)) {
				return [o, i];
			}
			if (!list[i].match(/^END[A-Z]*$/)) {
				let prop = list[i].split(' ');
				o[prop[0]] = prop[1].match(/^\d+$/) ? parseInt(prop[1], 10) : prop[1];
			}
			i++;
		}
		return [o, i];
	}

	toObject() {
		return fs.readFile(this.path).then((res) => {
			let lines = res.toString().replace(/\r/g, '').split('\n');
			let out = this.find(lines, 0);
			return out[0];
		});
	}

}

module.exports = Parser;
