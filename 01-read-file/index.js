const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');
const readSteam = fs.createReadStream(file, 'utf-8');

readSteam.on('data', text => {
	console.log(text)
})

