
### `Intro`
Util to parse [BDF](https://en.wikipedia.org/wiki/Glyph_Bitmap_Distribution_Format) font format files ready to be used to draw.

Example of a font being drawn
[logo]: https://raw.githubusercontent.com/anzerr/bdf.util/master/test/example.bmp "Example"
![alt text][logo]

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/bdf.util.git
```

### `Example`
``` javascript
const {parse} = require('bdf.util');

parser('./test/cherry-10-b.bdf').then((res) => {
	console.log(res);
});
```