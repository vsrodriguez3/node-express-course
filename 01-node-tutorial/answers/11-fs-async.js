const fs = require('fs');

console.log("at start");

fs.writeFile('./temporary/fileB.txt', 'This is line 1\n', (err) => {
    console.log("at point 1");
    if (err) {
        console.log("This error happened: ", err);
        return;
    }

    fs.writeFile('./temporary/fileB.txt', 'This is line 2\n', { flag: 'a' }, (err) => {
        console.log("at point 2");
        if (err) {
            console.log("This error happened: ", err);
            return;
        }

        fs.writeFile('./temporary/fileB.txt', 'This is line 3\n', { flag: 'a' }, (err) => {
            console.log("at point 3");
            if (err) {
                console.log("This error happened: ", err);
                return;
            }

            console.log("All lines written successfully");
        });
    });
});

console.log("at end");
