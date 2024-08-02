const fs = require('fs');

const first = 'This is the first line.'
const second = 'This is the second line.'
const third = 'This is the third line.'

fs.writeFileSync('./temporary/fileA.txt', `${first}\n`);
fs.writeFileSync('./temporary/fileA.txt', `${second}\n`, { flag: 'a' });
fs.writeFileSync('./temporary/fileA.txt', `${third}\n`, { flag: 'a' });

const data = fs.readFileSync('./temporary/fileA.txt', 'utf8');
console.log(data);