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
export default function ExtractDataAndMatch(itemsObj, storageStructure, regexStart, regexEnd, acceptedIdentifiers){
    itemsObj.files.forEach(file => {

        // Regex logic
        const regex = new RegExp(`${regexStart}([\\s\\S]*?)${regexEnd}`); //Start to End data selection
        const identifierRegexFormat = /\b[A-Z]+-\d+/g;
        const artifactIdentifierRegex = /\b[A-Z]+/g;



        //Read the file data & extract the match
        const data = fs.readFileSync(path.join(file.path, file.name), 'utf8') ;
        const match = data.match(regex);
        
        if(!(match == null)){
            //Extracting data between the start and end of the connection keywords @trace @ -> idicates end
            const extractedData = match[1].trim();

            // Slip the data  in array for valid identifier format
            const extractedIdentifiersArray = [...extractedData.matchAll(identifierRegexFormat)]; // An array with regex match [0] is the actual match

          if(extractedIdentifiersArray != null){

            console.log('Possible identifiers extracted: ', extractedIdentifiersArray) ;

            // Filter accepted artifact identifiers in an array
            const filteredIdentifiers = extractedIdentifiersArray.filter(id => {
              const artifactFormatMatch = id[0].match(artifactIdentifierRegex); // Takes the actual identifier and number text

              
              if(artifactFormatMatch != null){ //If the are actual values with the required format
                console.log('This is the prospect artifact extracted from id:',artifactFormatMatch[0])
                //Check the artifact with format is an actual accepted artifact of the traceability system
                return acceptedIdentifiers.includes(artifactFormatMatch[0]);
                console.log('valid identifiers selected:', artifactFormatMatch) ;
              }
              
            
            })
            

            // Storing the connection, only using valid identifiers
            filteredIdentifiers.forEach(identifier => {
                
                if(!storageStructure[identifier]){
                    //If this property identifier does not exist create a new one
                    storageStructure[identifier] = [];
                }
                
                // Append the new file info related to the identifier for proper mapping
                storageStructure[identifier].push({name: file.name , path: path.join(file.path, file.name) });
                

                /* // Possible approach
                storageStructure = {
                    ...storageStructure,
                    [identifier]: [...storageStructure[identifier], {name: file.name , path: path.join(file.path, file.name) } ]
                }
                */
            })
            console.log('Data being store with neat references:',storageStructure)
        }   
      }

        

        // Store the path of array of files selected file of current iteration  curren in the identifiers properties
        
    })
};

//ExtractDataAndMatch(mockReaddirOutput , storageStructure, wordA, wordB)