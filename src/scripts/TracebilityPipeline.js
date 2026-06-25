// DATA STRUCTURE PURPOSE: Stores directories (temporarely for scanning) and the complete collection of files 
/**
 * @typedef {object} innerItem
 * @property {string} name
 * @property {string} path
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
     * @param {artifactName} artifact // The artifact fo find with the algorithm
     * @param {innerItem[]} files //An array of project files
     * @param {regexExtractor} titleArtifactIdentifierReg // The expression to select the artifact from the title
     * @param {regexExtractor} titleFileNameReg // The expression to select name given to the file
     */
    findArtifactFile(artifactName, files, titleArtifactIdentifierReg, titleFileNameReg){

        /**
         * Loop in context:
         * The loop takes the key of the Artifact identifier that has connection mentions.
         * Then it compares it with the whole file list
         * If it finds a match and its not a Analytical breakdown artifact, 
         * then the path of the artifact can be extracted to write in it the **connections**
         */

        files.forEach(file => {

            // Select Name and file title artifact with numbers
            const fileTitleMatchCandidate = file.name.match(titleArtifactIdentifierReg)?[0]; 
            const fileNameCandidate = file.name.match(titleFileNameReg)?[0]; 
            hg

        })


        
    }
}

