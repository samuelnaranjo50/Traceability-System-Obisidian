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

//put this in a helper ->>
export default function ExtractDataAndMatch(itemsObj, storageStructure, regexStart, regexEnd){
    itemsObj.files.map(file => {

        // Regex logic
        const regex = new RegExp(`${regexStart}([\\s\\S]*?)${regexEnd}`);

        //Read the file data & extract the match
        const data = fs.readFileSync(path.join(file.path, file.name), 'utf8') ;
        const match = data.match(regex);
        
        if(match){
            //Extracting data. between the stard and end
            const extractedData = match[1].trim();
            console.log(extractedData) ;

            // Separate artifact identifiers in a array
            const extractedDataArray = extractedData.split(' ');
            console.log(extractedDataArray) ;

            // Storing the connection
            extractedDataArray.forEach(identifier => {
                
                if(!storageStructure[identifier]){
                    //If this property identifier does not exist create a new one
                    storageStructure[identifier] = [];
                }
                
                // Append the new file info related to the identifier call
                storageStructure[identifier].push({name: file.name , path: path.join(file.path, file.name) });
                

                /* // Possible approach
                storageStructure = {
                    ...storageStructure,
                    [identifier]: [...storageStructure[identifier], {name: file.name , path: path.join(file.path, file.name) } ]
                }
                */
            })
            console.log('Data being store with neat rreferences:',storageStructure)
        }   

        

        // Store the path of array of files selected file of current iteration  curren in the identifiers properties
        
    })
};

//ExtractDataAndMatch(mockReaddirOutput , storageStructure, wordA, wordB)