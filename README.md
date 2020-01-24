
### `Intro`
![GitHub Actions status | publish](https://github.com/anzerr/bdf.util/workflows/publish/badge.svg)

Util to parse [BDF](https://en.wikipedia.org/wiki/Glyph_Bitmap_Distribution_Format) font format files ready to be used to draw.

Example of a font being drawn using its bitmap an example can be found in test
<div style="text-align:center"><img src="https://raw.githubusercontent.com/anzerr/bdf.util/master/test/example.bmp" /></div>

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/bdf.util.git
```

#### `Example`
``` javascript
const {parse, bitmap} = require('bdf.util');

parse('./test/cherry-10-b.bdf').then((res) => {
	console.log(res);
});

bitmap('./test/cherry-10-b.bdf').then((res) => {
	console.log(res);
});
```