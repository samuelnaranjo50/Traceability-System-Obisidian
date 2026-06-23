// DATA STRUCTURE PURPOSE: Stores directories (temporarely for scanning) and the complete collection of files 

/**
 * @typedef DirectoryAndFileMap
 * @property {} files
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
     * @type {Record<string, TraceableFile[]>} ArtifactRelatedFileConnection
*/

class TraceabilityPipeline{

    

    /**
     * Finds the file where your algorithm will need to write the Artifact connections 
     * @param {ArtifactRelatedFileConnection} connections
     */
    findArtifactFile(ArtifactRelatedFileConnection){

        /**
         * Loop in context:
         * The loop takes the key of the Artifact identifier that has connection mentions.
         * Then it compares it with the whole file list
         * If it finds a match and its not a Analytical breakdown artifact, 
         * then the path of the artifact can be extracted to write in it the **connections**
         */
    
        for (const [key, value] of Object.entries(ArtifactRelatedFileConnection)){

        }
    }
}