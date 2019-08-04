
const fs = require('fs.promisify');

class Parser {

	constructor(p) {
		this.path = p;
		if (!Buffer.isBuffer(this.path) && typeof this.path !== 'string') {
			throw new Error('path needs to be a buffer or a string');
		}
		if (typeof this.path === 'string' && !this.path.match(/\.bdf$/)) {
			throw new Error('the file path extension is wrong');
		}
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
				let prop = list[i].match(/^([A-Z_]+?)\s(.*?)$/);
				console.log(list[i], prop);
				o[prop[1]] = prop[2].split(' ').map((a) => {
					return a.match(/^-?\d+$/) ? parseInt(a, 10) : a;
				});
				o[prop[1]] = o[prop[1]].length === 1 ? o[prop[1]][0] : o[prop[1]];
			}
			i++;
		}
		return [o, i];
	}

	fromBuffer(buff) {
		let lines = buff.toString().replace(/\r/g, '').split('\n');
		let out = this.find(lines, 0);
		return out[0];
	}

	toObject() {
		if (Buffer.isBuffer(this.path)) {
			return this.fromBuffer(this.path);
		}
		return fs.readFile(this.path).then((res) => this.fromBuffer(res));
	}

}

module.exports = Parser;
