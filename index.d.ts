
declare namespace bdf {

	function parse(data: string | Buffer) : any
	function bitmap() : Promise<any>
	function bitmapSync(data: string | Buffer) : any

}

export as namespace bdf;
export = bdf;