const path = require('node:path');
const fs = require('node:fs');

// Getting relative path 

const filePath = path.resolve(__filename);
const folderPath = path.resolve(__dirname, '../docs');
console.log('Logging:', folderPath);

try{
    const arrFiles = fs.readdirSync(folderPath, { withFileTypes: true });
    console.log(arrFiles);
    let arrObjItems = {
        files: [],
        dirs: []
    };
    // Separating files from directories
    arrFiles.map(item => {item.isFile()? arrObjItems.files.push(item): arrObjItems.dirs.push(item) })
    console.log('This are the current items store in the object', arrObjItems);
}
catch(error){
    console.log('This is the error:', error);
}

//Creating & writing a file
//  Including a path
/*
const someText = `[](${filePath})`;
console.log(someText);
fs.writeFileSync(path.join(folderPath, 'macondo.md'), someText, { flag: 'w+' } );
*/