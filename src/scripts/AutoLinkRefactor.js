// @trace  REQ-020 ADR-003 @

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
// Data structure
let arrObjItems = {
            files: [],
            dirs: []
        }

// Note: Make this helper recursively call itself to extract all data
SearchAndDivide(appRoot.path, excludeList, arrObjItems);

//temporary log
arrObjItems.files.forEach(file => console.log(file.name))

// Data structure for files connected to related artifacts
let filesPathAndIdentifierConnected = {}

// Regex Logic
const wordA = '@trace';
const wordB = '@';

// Accepted identifiers (Artifacts ID of the traceability system)
const systemArtifacts = ['REQ', 'ADR', 'VS'];

ExtractDataAndMatch(arrObjItems, filesPathAndIdentifierConnected, wordA, wordB, systemArtifacts );

console.log('DEBUG: What is the object?', filesPathAndIdentifierConnected);
console.log('DEBUG: What are the entries?', Object.entries(filesPathAndIdentifierConnected));

for( const[key, filesArray] of Object.entries(filesPathAndIdentifierConnected)){
    //console.log('DEBUG: This is the key being extracted:', key);
    //console.log('DEBUG: This is the value being extracted:', filesArray);
    
    filesArray.forEach(file => {
        console.log(`${key} connected to -> ${file.name} and ${file.path
        }`);
    })
    }
//Temporary log to check files that link to a artifact are actually mapped properly

//Creating & writing a file
//  Including a path
/*
const someText = `[](${filePath})`;
console.log(someText);
fs.writeFileSync(path.join(folderPath, 'macondo.md'), someText, { flag: 'w+' } );
*/