// DATA STRUCTURE PURPOSE: Stores directories (temporarely for scanning) and the complete collection of files 
/**
 * @typedef {object} innerItem
 * @property {string} name
 * @property {string} path
 *  
 */

import { path } from "app-root-path";


/**
 * @typedef {object} DirectoryAndFileMap
 * @property {innerItem[]} files
 * @property {innerItem[]} dirs
 */

// DATA STRUCTURE PURPOSE: Stores a valid Artifact and the files that mention it
/**
     * 1. Internal content structure
     * @typedef TraceableFile
     * @property {string} name
     * @property {string} path
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

class TraceabilityPipeline{

    

    /**
     * Finds the file where your algorithm will need to write the Artifact connections 
     * @param {artifactName} artifact - The artifact fo find with the algorithm
     * @param {innerItem[]} files - An array of project files
     * @param {regexExtractor} titleArtifactIdentifierReg - The expression to select the artifact from the title
     * @param {regexExtractor} titleFileNameReg - The expression to select name given to the file
     * @returns {string} Valid path not repeated artifact 
     */
    findArtifactFile(artifact, files, titleArtifactIdentifierReg, titleFileNameReg) {


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
                const artifactInTitle = file.name.match(titleArtifactIdentifierReg) ? [0];
                const fileNameInTitle = file.name.match(titleFileNameReg) ? [0];


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
                        const path = path.join(file.path, file.name)
                        validArtifactPath.add(path)
                    }
                }

            })

            //Check the docs don't have repeated artifacts
            if(validArtifactPath.size > 1){
                throw new DuplicateArtifact(`The next is a location or location where ${artifact} is duplicated: ${JSON.stringify([...validArtifactPath])}`);
            }

            //Valid Path extracted
            return validArtifactPath.values().next().value; // uses set extraction of value protocol
        }
        catch (error) {
            console.error("Critical error detected in pipeline!");
            throw error; // Stop the script, to ensure the builder fixes the duplicate files
        }











    }
}

