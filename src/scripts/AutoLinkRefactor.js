// @trace  REQ-020 ADR-003 VS-006 @

import { SearchAndDivide } from "./FileSelectionHelper.js";
import ExtractDataAndMatch from "./PathExtractionHelper.js";
import path from "node:path";
import fs, { readdirSync, readFileSync } from "node:fs";
import matter from "gray-matter";

// Project Root path
import appRoot from "app-root-path";

/*
// Getting relative path (for now doesnt seem neccesary)
const rootFolderPath = path.resolve(__dirname, appRoot);
console.log('Logging:', rootFolderPath, appRoot);
*/

// List of exact items you want to avoid reading
const excludeList = [
  ".gitignore",
  ".git",
  ".DS_Store",
  "node_modules",
  "README.md",
  "package-lock.json",
  "package.json",
  ".wakatime-project",
];

// Finding Files & directories & filtering function
// Data structure
let arrObjItems = {
  files: [],
  dirs: [],
};

// Note: Make this helper recursively call itself to extract all data
SearchAndDivide(appRoot.path, excludeList, arrObjItems);

//temporary log
arrObjItems.files.forEach((file) => console.log(file.name));

// Data structure for files connected to related artifacts
let filesPathAndIdentifierConnected = {};

// Regex Logic
const wordA = "@trace";
const wordB = "@";

// Accepted identifiers (Artifacts ID of the traceability system)
const systemArtifacts = ["REQ", "ADR", "VS"];

ExtractDataAndMatch(
  arrObjItems,
  filesPathAndIdentifierConnected,
  wordA,
  wordB,
  systemArtifacts,
);

console.log("DEBUG: What is the object?", filesPathAndIdentifierConnected);
console.log(
  "DEBUG: What are the entries?",
  Object.entries(filesPathAndIdentifierConnected),
);

for (const [key, filesArray] of Object.entries(
  filesPathAndIdentifierConnected,
)) {
  //console.log('DEBUG: This is the key being extracted:', key);
  //console.log('DEBUG: This is the value being extracted:', filesArray);

  filesArray.forEach((file) => {
    console.log(`${key} connected to -> ${file.name} and ${file.path}`);
  });
}
//Temporary log to check files that link to a artifact are actually mapped properly

/* WRITING THE CONNECTIONS TO FILES:
//  Including a path

*/

// temp: Find were to place the data use arrObjItems.files & filesPathAndIdentifierConnected iterating over the REQ

const fileTitleIdentifierFilteringRegex = /\b[A-Z]+-\d+/; //Regex for selecting Artifact format from text 
const fileNameFilterRegex = /(?<=_)[a-zA-Z_]+/ //Regex for selecting the name based on the underscore "_" convention given to the file
const fileIdentifierNoNumFilteringRegex = /(?<=-)[A-Z]+(?=-)/; // Select only the artifact for TSO-REQ-001 it will extract "REQ"
const fileExtensionExtractionRegex = /(?<=\.)[a-z]+/; // Selects from a . to find the extension
// File extension Classification
const extensionClassification = {
    Architecture: ["VS", "ADR"], // Verify Artifact for clasification
    Requirements: ["REQ"], // Verify Artifact for clasification,
    Prototypes: [], // Hard Written links not part of automatic mapping but must persist !TODO
    Core: ["js"],
    Client: [],
    Verification: [],
    Other: [],
    

}


for (const [key, value] of Object.entries(filesPathAndIdentifierConnected)) {
  // Find the file to which to write using regex and comparison probabily match findIndex

  arrObjItems.files.forEach((file) => {

    /*
    // Loop in context:
    // The loop takes the key of the Artifact identifier that has connection mentions.
    // Then it compares it with the whole file list
    // If it finds a match and its not a Analytical breakdown artifact, 
    // then the path of the artifact can be extracted to write in it the **connections**
    */

    const fileTitleMatchCandidate = file.name.match(fileTitleIdentifierFilteringRegex); //Extracts Artifact Identifier with numbers from file title
    const fileNameCandidate = file.name.match(fileNameFilterRegex); // Extracts name given to the file

    //console.log('DEBUG: Checking the current key', );
    //console.log('DEBUG: Checking the file name regex extraction', fileTitleMatchCandidate);

    if (fileTitleMatchCandidate != null && (fileNameCandidate == null || fileNameCandidate[0] !== "Analytical_Breakdown") ) {
        //console.log(`DEBUG: current key ${key} and current extracted value from file.name ${fileTitleMatchCandidate[0]}`, );

      if (key == fileTitleMatchCandidate[0]) { //Ensure messy withe spaces dont break the comparison
        /*
        // Mission: 
        // - Checks what is the file of the Accepted Artifact stored identifier
        // - Classifies the connections store in the object related to this !{key}, hint: use control structure
        // - procceds to write the formated classification in a table within the path of the identifier file
        */

        //Valid accepted Artifact data
        const validArtifactPath = path.join(file.path, file.name);
        console.log(`DEBUG CURRENT ARTIFACT: Object of artifact ${file.name} inner look ${JSON.stringify(validArtifactPath)}`);

        console.log(
          `DEBUG IMPORTANT- key is-> ${key} and is related with this file -> ${path.join(file.path, file.name)}`,
        );

        // Temporary Storage for clasification
          const currentClasification = {
            "📕 Architecture": [],
            "📓 Requirements": [],
            "🧪 Prototypes": [],
            "⚙️ Core Logic (Backend/Systems)": [],
            "🎨 Client Layer (Frontend/UI)": [],
            "🛡️ Verification (Tests & Config)": [],
            "📂 Other": [],
          };

        /*
        // Logic for Artifact clasification:
        // - Loop over the stored links within filesPathAndIdentifierConnected
        // - Check if the current iteration is included in the accepted artifact
        // - If not check if the extension of the file is in one of the elements
        // - If not add to the others section
        */

        // Loop
        
        // JSON.stringify forces JavaScript to print the EXACT string with quotes and \n symbols
        console.log("DEBUG TRUE KEY:", JSON.stringify(key));

        // This will print the actual contents of your object instead of [object Object]
        //console.log("DEBUG OBJECT DUMP:", JSON.stringify(filesPathAndIdentifierConnected[key], null, 2));


        filesPathAndIdentifierConnected[key].forEach(file => {

          /*
          // Loop in context:
          // - Now that the path of the artifact is selected you can write to it
          // - Loop over the connections and calssify them properly
          // - Every time you classify them add it to the temporary storage structure outside of the loop
          // - This stored and classified connections will be used to write the connections section in the outer loop since this is the loop that has the artifact selected
          */
            const artifactIdentfier = file.name.match(fileIdentifierNoNumFilteringRegex)?.[0]; 
            const extension = file.name.match(fileExtensionExtractionRegex)?.[0]; // ?: checks if the value exist else return undefined .[0] extracts the value

            // Which logic to activate
            /*
            const logic = {
                isArch: false,
                isREQ: false,
                isLogic: false,
                isClient: false,
                isVer: false,
                isOther: false
            }*/

            const classification = new Set(); //Store the current classificationadd
            // Defining logic base on Artifact in name
            if(artifactIdentfier && systemArtifacts.includes(artifactIdentfier)){
                if(extensionClassification.Architecture.includes(artifactIdentfier)) classification.add('📕 Architecture');
                if(extensionClassification.Requirements.includes(artifactIdentfier)) classification.add('📓 Requirements');
                if(extensionClassification.Prototypes.includes(artifactIdentfier/*Should be changed to custom regex for proto*/ ))classification.add("🧪 Prototypes");
            }
             
            // Defining logic base on extension
            if(extension){
                if(extensionClassification.Core.includes(extension)) classification.add('⚙️ Core Logic (Backend/Systems)') ;
                if(extensionClassification.Client.includes(extension)) classification.add('🎨 Client Layer (Frontend/UI)');
                if(extensionClassification.Verification.includes(extension)) classification.add('🛡️ Verification (Tests & Config)');
            }

            // Defining if should be clasifying as other  
            if(classification.size === 0){
                classification.add("📂 Other");
            }

            console.log(`DEBUG: Checking if clasification works \n - file: ${file.name} \n classification: ${[...classification]}`);
            

            // Store the classify file to the proper property
            try{

              if(classification.size > 1){
                throw new MultiClassification(`The algoritm logic is selecting more than one category for the related file: ${file.name}`)
              }
              
              const singleCategory = [...classification][0];
              currentClasification[singleCategory].push(file);
            }
            catch(err){
              console.log(err);

            }
            //currentClasification.
        })

        //checking if files store properly in its assigned category
        console.log(`DEBUG DATA STRUCTURE: Object of connections inner look ${JSON.stringify(currentClasification)}`);

        // !Write the connections in Artifact file
        
        // Should place path -> validArtifactPath but i will hardcode it to ensure no data is lost
        const artifactData = fs.readFileSync('/Users/s_n_gr/Documents/My-Engineering-projects/traceability_system/docs/requirements/TSO-REQ-023_trying_connections.md', 'utf8'); // Extract artifact data to defnie where to plug
        const parsedData = matter(artifactData);
        //console.log(`CHECK PARS ARTIFACT DATA: GRAY-MATTER Yaml separation object inner look ${JSON.stringify(parsedData)}`);

        //Data is divide now you need to append to it some links
        /*
        // TEST: 
        // - Define the header
        // - Build a table dynamically based on the key and the values of the currentClasification object
        // - Avoid adding table row of empty type categories
        // - Select the file name without extension make it be the link name
        // - Add the path as link
        // 
        */

        // Iterate over the key and then over the array of object of classify 
        const sectionHeader = '## Connections\n';
        const dynamicTableHeader = '| Type | Route |\n| :---  | :--- |\n'; //How should the header look like

        let dynamicTable = '';
        dynamicTable += dynamicTableHeader;
        
        for(const [key, arrayOfObjects] of Object.entries(currentClasification)){
          if (Array.isArray(arrayOfObjects) && arrayOfObjects.length === 0) continue;
          const type = `|**${key}**|`;
          dynamicTable += type ;

          
          arrayOfObjects.forEach(obj => {
            
            dynamicTable += `[${obj.name}](${obj.path}) <br>`
          })

          dynamicTable += "|\n";
          
        }
        
        

         parsedData.content = sectionHeader + dynamicTable + parsedData.content ;
         const updatedFileRaw = matter.stringify(parsedData.content, parsedData.data);
        fs.writeFileSync('/Users/s_n_gr/Documents/My-Engineering-projects/traceability_system/docs/requirements/TSO-REQ-023_trying_connections.md',updatedFileRaw, { flag: 'r+' } );

      }
    }
  })
}

/*
const someText = `[](${filePath})`;
console.log(someText);
fs.writeFileSync(path.join(folderPath, 'macondo.md'), someText, { flag: 'w+' } );
*/
