
class Char {

	offset: {x: number; y: number};
	width: number;
	height: number;
	bitmap: number[];

}

type CharList = {[key: string]: Char};

declare namespace bdf {

	function parse(data: string | Buffer): any
	function bitmap(string: string): Promise<CharList>
	function bitmapSync(data: string | Buffer): CharList

}

export as namespace bdf;
export = bdf;