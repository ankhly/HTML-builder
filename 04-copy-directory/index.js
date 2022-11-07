const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'files');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
	if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, data) => {
	if (err) throw err;
	if (data.length > 1) {
		data.forEach((f) => {
			const delFile = path.join(__dirname, 'files-copy', f);
			fs.unlink(delFile, (err) => {
				if (err) throw err;
			})
		})
	} else {
		return;
	}
});

fs.readdir(file, (err, data) => {
	if (err) throw err;
	data.forEach((e) => {
		const fileCopy = path.join(__dirname, 'files', e);
		const newCopy = path.join(__dirname, 'files-copy', e);
		fs.copyFile(fileCopy, newCopy, (err) => {
			if (err) throw err;
		});
	})
})
