import { SearchAndDivide } from './FileSelectionHelper.js';
import ExtractDataAndMatch from './PathExtractionHelper.js';
import path from 'node:path';
import fs, { readFileSync } from 'node:fs';


// Project Root path
import appRoot from 'app-root-path';


/*
// Getting relative path (for now doesnt seem neccesary)
const rootFolderPath = path.resolve(__dirname, appRoot);
console.log('Logging:', rootFolderPath, appRoot);
*/

// List of exact items you want to avoid reading
const excludeList = ['.gitignore', '.git', '.DS_Store', 'node_modules', 'README.md', 'package-lock.json', 'package.json', '.wakatime-project'];

// Finding Files & directories & filtering function
// Note: Make this helper recursively call itself to extract all data
const folderItems = SearchAndDivide(appRoot.path, excludeList);

// Data structure for files connected to related artifacts
let filesPathAndIdentifierConnected = {}

// Regex Logic
const wordA = '@trace';
const wordB = '@end';

//put this in a helper ->>

ExtractDataAndMatch(folderItems, filesPathAndIdentifierConnected, wordA, wordB );



//Creating & writing a file
//  Including a path
/*
const someText = `[](${filePath})`;
console.log(someText);
fs.writeFileSync(path.join(folderPath, 'macondo.md'), someText, { flag: 'w+' } );
*/