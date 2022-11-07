const fs = require('fs');
const path = require('path');
const outputHTML = fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
const outputCSS = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'));
const template = path.join(__dirname, 'template.html');
const compo = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
	if (err) throw err;
});

fs.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, (err) => {
	if (err) throw err;
});

fs.readdir(assets, (err, data) => {
	if (err) throw err;
	data.forEach((e) => {
		fs.mkdir(path.join(__dirname, `project-dist/assets/${e}`), { recursive: true }, (err) => {
			if (err) throw err;
		});
		fs.readdir(path.join(__dirname, 'assets', e), (err, data) => {
			if (err) throw err;
			data.forEach(i => {
				const fileCopy = path.join(__dirname, `assets/${e}`, i);
				const newCopy = path.join(__dirname, `project-dist/assets/${e}`, i);
				fs.copyFile(fileCopy, newCopy, (err) => {
					if (err) throw err;
				});
			})
		})
	})
})

fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
	if (err) throw err;
	data.forEach(e => {
		if (path.extname(e) === '.css') {
			const input = fs.createReadStream(path.join(__dirname, 'styles', e))
			input.on('data', (chunk) => {
				outputCSS.write(chunk)
			});
		}
	})
})

let arrCom = [];
fs.readdir(compo, { withFileTypes: true }, (err, data) => {
	if (err) throw err;
	data.forEach(e => {
		e = e.name.split('.').slice(0, -1).join();
		arrCom.push(e);
	})
})

fs.readFile(template, (err, data) => {
	data = data.toString();
	let j = 0;
	for (let i = 0; i < arrCom.length; i++) {
		fs.readFile(path.join(__dirname, 'components', `${arrCom[i]}.html`), (err, dat) => {
			if (err) throw err;
			data = data.replace(`{{${arrCom[i]}}}`, dat);
			j++;
			if (j == arrCom.length) {
				outputHTML.write(data);
			}
		})
	}
})
