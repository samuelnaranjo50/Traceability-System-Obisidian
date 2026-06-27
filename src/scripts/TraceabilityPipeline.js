import { error } from 'node:console';
import path from 'node:path';
import fs, {readFileSync } from "node:fs";
import matter from "gray-matter";

class DuplicateArtifact extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicateArtifact";
    }
}

class MultiClassification extends Error{
    constructor(message){
        super(message);
        this.name = "MultiClassification"
    }
}

// DATA STRUCTURE PURPOSE: Stores directories (temporarely for scanning) and the complete collection of files 
/**
 * @typedef {object} innerItem
 * @property {string} name - Only the name of the file
 * @property {string} path - Only the path to the parent folder
 *  
 */

/**
 * @typedef {object} DirectoryAndFileMap
 * @property {innerItem[]} files
 * @property {innerItem[]} dirs
 */

// DATA STRUCTURE PURPOSE: Stores a valid Artifact and the files that mention it
/**
* 1. Internal content structure
* @typedef {Object} TraceableFile
* @property {string} name - Name of the file
* @property {string} path - Complete path including the file name
*/

/**
* 2. Master Object
* @typedef {Record<string, TraceableFile[]>} ArtifactRelatedFileConnection
*/

/**
 * Stores the artifact identifier and number
 * @typedef {string} artifactName
 */

// REGEX LOGIC STRUCTURES
/**
 * @typedef {RegExp} regexExtractor 
 */

// CLASSIFICATION STRUCTURE
/**
 * @typedef {string} identifier - Can be an artifact identifier or a file extension
 */

/**
 * @typedef {Record<string, identifier[]>} classificationGuidelines
 */

// CLASSIFICATION STORAGE

/**
 * @typedef {Record<string, TraceableFile[]>} classifyData
 */
 

export default class TraceabilityPipeline{

    

    /**
     * Finds the file where your algorithm will need to write the Artifact connections 
     * @param {artifactName} artifact - The artifact fo find with the algorithm
     * @param {innerItem[]} files - An array of project files
     * @param {regexExtractor} titleArtifactIdentifierReg - The expression to select the artifact from the title
     * @param {regexExtractor} titleFileNameReg - The expression to select name given to the file
     * @returns {string} Valid path not repeated artifact 
     */
    static findArtifactFile(artifact, files, titleArtifactIdentifierReg, titleFileNameReg) {


        try {
            const validArtifactPath = new Set(); // Stores the valid path but serves as system inconsistency validation

            /**
         * Loop in context:
         * The loop takes the key of the Artifact identifier that has connection mentions.
         * Then it compares it with the whole file list
         * If it finds a match and its not a Analytical breakdown artifact, 
         * then the path of the artifact can be extracted to write in it the **connections**
         */
            files.forEach(file => {

                // Select Name and file title artifact with numbers
                const artifactInTitle = file.name.match(titleArtifactIdentifierReg) ?.[0];
                const fileNameInTitle = file.name.match(titleFileNameReg) ?.[0];


                /**
                 * Condition in context:
                 * - Checks if and artifact identifier is found in the title
                 * - Validates if there is contextual name in the title, if so it check if is analytical breakdown, is true well not valid artifact file skip current.
                 * - Checks what is the file of the Accepted Artifact stored identifier
                 */
                if (artifactInTitle) {
                    if (artifactInTitle && fileNameInTitle == "Analytical_Breakdown") return; // Skips the current file
                    if (artifact == artifactInTitle && (fileNameInTitle !== "Analytical_Breakdown")) {
                        //Build a valid system resistant path
                        const resolvedPath = path.join(file.path, file.name)
                        validArtifactPath.add(resolvedPath)
                    }
                }

            })

            //Check the docs don't have repeated artifacts
            if(validArtifactPath.size > 1){
                throw new DuplicateArtifact(`The next is a location or locations where ${artifact} is duplicated: ${JSON.stringify([...validArtifactPath])}`);
            }

            //Valid Path extracted
            return validArtifactPath.values().next().value; // uses set extraction of value protocol
        }
        catch (error) {
            console.error("Critical error detected in pipeline! Pipeline halted to protect vault data integrity.");
            throw error; // Stop the script, to ensure the builder fixes the duplicate files
        }

    }
    /**
     * @param {ArtifactRelatedFileConnection | TraceableFile[]} connectedFilesInput - The source data, a raw array of traceable files comming for a specific artifact key connections.
     * @param {classificationGuidelines} guidelines
     * @param {regexExtractor} fileArtifactIdentifierReg - Selects only the artifact e.g: ("PRO-REQ-001" will extract "REQ")
     * @param {regexExtractor} fileExtensionExtractionReg - Selects only the extension after the "."  e.g: ("myFile.test.js" will extract "test.js")
     * @returns {classifyData} - Object with classification
     */

    static classifyArtifactConnections(connectedFilesInput, guidelines, fileArtifactIdentifierReg, fileExtensionExtractionReg){

        const currentClasification = {
            "📕 Architecture": [],
            "📓 Requirements": [],
            "🧪 Prototypes": [],
            "⚙️ Core Logic (Backend/Systems)": [],
            "🎨 Client Layer (Frontend/UI)": [],
            "🛡️ Verification (Tests & Config)": [],
            "📂 Other": [],
          };

        /**
        * Logic for files classification:
        * - Loop over the stored connections of the specific Artifact identifier.
        * - Check if the current iteration is included in the accepted artifacts
        * - Compare it with the logic that classifies based on artifact identifier. 
        * - If not, check if the extension of the file is in one of the elements.
        * - If not, add to the others section.
        */

        connectedFilesInput.forEach(file => {

            /**
             * @type {TraceableFile} file
             */

            const artifactIdentfier = file.name.match(fileArtifactIdentifierReg)?.[0]; 
            const extension = file.name.match(fileExtensionExtractionReg)?.[0]; // ?: checks if the value exist else return undefined .[0] extracts the value


            /**
             * @typedef {Set<string>} classification
             */
            const classification = new Set(); //Store the current classification
            

            // Notice: The string added to classification must match the currentClasification clasifications keys

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
                throw new MultiClassification(`The algoritm logic is selecting more than one category for the related file: ${file.name} \n This are the classifications:: ${[...classification]}`)
              }
              
              const singleCategory = [...classification][0];
              currentClasification[singleCategory].push(file);
            }
            catch(error){
              console.error('Categorization critical identification uncapability');
              throw error;
            }

        })

        return currentClasification;
    }

    /**
     * @param {Boolean} activateHeader - Activates the header for the connection section
     * @param {classifyData} categorizedData - An object with the table **areas** and respective files classified in that area
     * @param {string} artifactPath - The path of the artifact where connections are being categorized
     * @param {regexExtractor} fileAvoidExtensionReg - Selects only the name avoiding any data  after the "."  e.g: ("myFile.js" will avoid ".js")
     * @returns {string} - String with the text that creates a markdown table when render by a markdown enginee
     */

    static buildMarkdownConnectionTable(activateHeader, categorizedData, artifactPath, fileAvoidExtensionReg) {

        /**
        * Documentation for markdown rendering logic:
        * - Define the header.
        * - Build a table dynamically based on the key and the values of the currentClasification object.
        * - Avoid adding table rows for empty type categories.
        * - Select the file name without extension to use as the link display name.
        * - Add the path as the link destination.
        */

        const dynamicTableHeader = '| Type | Route |\n| :--- | :--- |\n'; //How should the header look like

        let dynamicTable = '<span hidden data-connections-begin></span>\n\n'; // Adds the token delimeter before the table 'span hidden'

        dynamicTable += dynamicTableHeader; // Starts the table with the specified table header

        for (const [key, arrayOfObjects] of Object.entries(categorizedData)) {
            /**
            * @type {string} key - Is the category on which a collection of traceableFiles[] are clasified
            * @type {TraceableFile[]} arrayOfObjects
            */

            if (Array.isArray(arrayOfObjects) && arrayOfObjects.length === 0) continue; // Skips empty connections in classification categories
            const type = `|**${key}**|`;
            dynamicTable += type;


            arrayOfObjects.forEach(fileObj => {
                /**
                 * @type {TraceableFile} fileObj
                 */
                // Find the relative path from artifact to the connected file
                const relativeFilePath = path.relative(artifactPath, fileObj.path);

                const nameWithoutExtension = fileObj.name.match(fileAvoidExtensionReg)?.[0];

                if (nameWithoutExtension) {
                    dynamicTable += `[${nameWithoutExtension}](${relativeFilePath}) <br>`;
                }


            })

            dynamicTable += "|\n"; // Finish the row

        }

        dynamicTable += '\n<span hidden data-connections-end></span>' // After the table is finish  adds the token delimiter after the table 



        // Handles REQ & VS connections write

        if (activateHeader == true) {
            const sectionHeader = '## Connections\n';
            return sectionHeader + dynamicTable
        }
        else { // Handles ADR connections 

            /**
             * Make the table part of quoteblock
             */

            //console.log('DEBUG: table before quote block:', dynamicTable) //Table before quote block 

            const lineBeginReg = /^/gm;
            dynamicTable = dynamicTable.replace(lineBeginReg, "> ");

            //console.log('DEBUG: Table after quote block:', dynamicTable)//Table after quote block 
            return dynamicTable
        }
    } 

    /**
     * @param {artifactName} artifact - The artifact to write to identify its type
     * @param {string} artifactPath - The path of the artifact to write the connections
     * @param {string} markdownData - The data that should be inserted in the file
     * @returns {string} updatedFile - The file with its previous content and the updated data, helpful data logic testing
     */
    static writeConnectionsToArtifact(artifact, artifactPath, markdownData){
        // Should place path -> validArtifactPath but i will hardcode it to ensure no data is lost

        console.log("DEBUG: Receiving artifact:", artifact);

        const artifactData = fs.readFileSync(artifactPath, 'utf8'); // Extract artifact data to define where to plug

        const afterYAML = ['REQ', 'VS']//What artifact to insert data after YAML
        const specificSection = ['ADR'] //What artifact to insert data in specific connection variation section

        /**
         * Divides the YAML data from the content using gray-matter, once extracted to a varible the parsed data:
         * - use `.content` to access its content
         * - use `.data` to put together all the properties of the yaml 
         * - use .stringify to build all the data including the YAML back on top.
         */
        const parsedData = matter(artifactData); 

        if(afterYAML.includes(artifact)){

            if(parsedData.content.includes('## Connections\n')){
                // Since the markdown data already contains the header replace the data from the header

                const fileWithHeaderReg = /## Connections\s*<span hidden data-connections-begin><\/span>[\s\S]*?(<span hidden data-connections-end><\/span>)/i;
                parsedData.content = parsedData.content.replace(fileWithHeaderReg, `${markdownData}`)
            }

            //First time connections data appending
            if(!(parsedData.content.includes('## Connections\n'))){
                parsedData.content = markdownData + parsedData.content; // Adding the markdown data on top without replacing
            }

            //console.log("DEBUG: Checking what is being build when the file is clean VS or REQ:", parsedData.content ) - Temp debug log

        }   

        if(specificSection.includes(artifact)){
            /**
             * Custom data insertion within specific section:
             * - .replace() with
             * Add back the specific keyword + the content to be added, replacing the other content
             */
            const fileFindSectionReg = /(>\s*\*Connections\*[\s\S]*?)<span\s+hidden\s+data-connections-begin><\/span>[\s\S]*?>?\s*<span\s+hidden\s+data-connections-end><\/span>/i;
            parsedData.content = parsedData.content.replace(fileFindSectionReg, `$1${markdownData}`)
            
            //console.log("DEBUG: Checking what is being extracted", parsedData.content )
        }

        // Update the file data
        const updatedFile = matter.stringify(parsedData.content, parsedData.data ) //Stringify puts properties and content back together

        // Rewrite the file with the new content
        try{
            fs.writeFileSync(artifactPath, updatedFile, { flag: 'r+' } ); //Temporary disable
            return updatedFile;
        }
        catch(error){
            if (error.code === 'ENOENT') {
            console.warn(`File with path ${artifactPath} not found. Skipping write operation...`);
        }

        
        
    }
}}