const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'))

fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
	if (err) throw err;
	data.forEach(e => {
		if (path.extname(e) === '.css') {
			const input = fs.createReadStream(path.join(__dirname, 'styles', e))
			input.on('data', (chunk) => {
				output.write(chunk)
			});
		}
	})
})
