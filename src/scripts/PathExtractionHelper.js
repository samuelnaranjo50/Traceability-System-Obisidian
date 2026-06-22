// @trace REQ-020 @ 

import fs from 'node:fs';
import path from 'node:path';
/*
// Regex Logic
const wordA = '@trace'
const wordB = '@end'

//let storageStructure = {};

/*const mockReaddirOutput = {files: [
  {
    name: 'trial.md',
    parentPath: '/Users/s_n_gr/Documents/My-Engineering-projects/traceability_system',
    path: '/Users/s_n_gr/Documents/My-Engineering-projects/traceability_system',
    isFile: () => true,        // Simulates a file
    isDirectory: () => false,
  }, 
  {
    name: 'anotherfileTrial.md',
    parentPath: '/Users/s_n_gr/Documents/My-Engineering-projects/traceability_system',
    path: '/Users/s_n_gr/Documents/My-Engineering-projects/traceability_system',
    isFile: () => true,        // Simulates a file
    isDirectory: () => false,
  }, 
]}
  */

/*
@Param itemsObj: The object containing the files array of objects with paths and name
@Param storageStructure: The empty object where the Identifiers will be mapped to the files that mention them
@Param regexStart: Key identifier from where to select data
@Param regexEnd: Key identifier end of the selection
@Param acceptedIdentifiers: The identifiers the code should select and map
*/


//put this in a helper ->>
export default function ExtractDataAndMatch(itemsObj, storageStructure, regexStart, regexEnd, acceptedIdentifiers) {
  itemsObj.files.forEach(file => {

    // Regex logic for: Expression extraction & data filtering
    const regex = new RegExp(`${regexStart}([\\s\\S]*?)${regexEnd}`, 'g'); //Start to End data selection using *keywords*
    const identifierRegexFormat = /(?:^|\s)[A-Z]+-\d+/g; //Possible candidates that match artifact identifier structure
    const artifactIdentifierRegex = /\b[A-Z]+/g; // Extracts only the *artifact identifier*, later is compare to the valid artifact in the system



    //Read the file data & extract the match
    const data = fs.readFileSync(path.join(file.path, file.name), 'utf8');
    const matchKeywordSectionArr = [...data.matchAll(regex)]; // An array that uses the matchAll method that extract data between keywords and even handles multiple calls
    //console.log('DEBUG CURRENT: Extracted data between keywords 1 ->', matchKeywordSectionArr);
    if (!(matchKeywordSectionArr == null)) {
      /*
      // Extracting data between the start and end of the connection keywords @trace @ -> idicates end
      // 
      // 
      */
      let extractedDataBetweenKeys = '';
      matchKeywordSectionArr.forEach(match => {
        console.log('DEBUG CURRENT: what is the current match ->', match[0]);
        extractedDataBetweenKeys = extractedDataBetweenKeys + '' + match[1]; // Add match[1] so that we only store  text between keywords 
      })

      console.log('DEBUG: data that is between keyword in current file ->', extractedDataBetweenKeys); //temporay log
   
      // Slip the data  in array for valid identifier format
      const extractedIdentifiersArray = [...extractedDataBetweenKeys.matchAll(identifierRegexFormat)]; // An array with mathc all regex spread consist in a 2D array where in the nested array(columns) [iteration][0] index is the actual match

      if (extractedIdentifiersArray != null) {

        

        // Filter accepted artifact identifiers in an array
        const filteredIdentifiers = extractedIdentifiersArray.filter(id => {

          console.log('DEBUG CURRENT: Possible identifiers extracted: ',  id[0]); // Tempo log

          const artifactFormatMatch = id[0].match(artifactIdentifierRegex); // Takes the actual identifier and number text
          

          if (artifactFormatMatch != null) { //If the are actual values with the required format
            console.log('This is the prospect artifact extracted from id:', artifactFormatMatch[0])
            //Check the artifact with format is an actual accepted artifact of the traceability system
            return acceptedIdentifiers.includes(artifactFormatMatch[0]);
            console.log('DEBUG CURRENT: valid identifiers selected:', artifactFormatMatch);
          }


        })


        // Storing the connection, only using valid identifiers
        filteredIdentifiers.forEach(identifier => {

          if (!storageStructure[identifier]) {
            //If this property identifier does not exist create a new one
            storageStructure[identifier] = [];
          }

          // Append the new file info related to the identifier for proper mapping
          storageStructure[identifier].push({ name: file.name, path: path.join(file.path, file.name) });


          /* // Possible approach
          storageStructure = {
              ...storageStructure,
              [identifier]: [...storageStructure[identifier], {name: file.name , path: path.join(file.path, file.name) } ]
          }
          */
        })
        console.log('Data being store with neat references:', storageStructure)

      }
    }

    // [!Danger] end of the loop  

    // Store the path of array of files selected file of current iteration  curren in the identifiers properties

  })
};

//ExtractDataAndMatch(mockReaddirOutput , storageStructure, wordA, wordB)