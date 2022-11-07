const fs = require('fs');
const path = require('path');
let text = '';
const { stdin, stdout } = process;
const file = path.join(__dirname, 'text.txt');
const fileOn = fs.createWriteStream(file);


stdout.write('Hello! What is you text?\n');

stdin.on('data', (data) => {
	if (data.toString().trim() === 'exit') {
		process.exit();
	} else {
		fileOn.write(data);
	}
	fs.writeFile(
		path.join(file),
		text += data,
		(err) => {
			if (err) throw err;
		},
	)
})

process.on('exit', () => {
	stdout.write('See you late! Bye!');
});
process.on('SIGINT', () => process.exit());