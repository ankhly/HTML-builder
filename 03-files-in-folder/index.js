const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'secret-folder');

fs.readdir(file, { withFileTypes: true }, (err, data) => {
	data.forEach((e) => {
		if (e.isFile()) {
			const fileE = path.join(__dirname, 'secret-folder', e.name);
			fs.stat(fileE, (err, stats) => {
				console.log(e.name.slice(0, e.name.indexOf('.')) + ' - ' + path.extname(e.name) + ' - ' + stats.size + 'B');
			})
		}
	})
})

