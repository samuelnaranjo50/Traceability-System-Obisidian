// This is the function that executes the system task

import { config } from "node:process";
import SearchAndDivide  from "./FileSelectionHelper.js";
import ExtractDataAndMatch from "./PathExtractionHelper.js";
import ts from "./TraceabilityPipeline.js"
import { match } from "node:assert";

// Project Root path
import appRoot from "app-root-path";



/**
 * Configuration for the run
 */

const CONFIG = {
    vaultPath: appRoot.path,
    excludeList: [
        ".gitignore",
        ".git",
        ".DS_Store",
        "node_modules",
        "README.md",
        "package-lock.json",
        "package.json",
        ".wakatime-project",
    ],
    acceptedSystemArtifacts: ["REQ", "ADR", "VS"],
    markdownHeaderGuidelines: {header: ["REQ", "VS"], noHeader: ["ADR"]},
    treaceabilityKeyWords: {start: "@trace", end: "@"},
    fileTitleIdentifierFilteringRegex: /\b[A-Z]+-\d+/, //Regex for selecting Artifact format from text e.g: From TSO-ADR-000 the regex will select ADR-000
    fileNameFilterRegex: /(?<=_)[a-zA-Z_]+/, //Regex for selecting the name based on the underscore "_" convention given to the file
    fileIdentifierNoNumFilteringRegex: /(?<=-)[A-Z]+(?=-)/, // Select only the artifact for TSO-REQ-001 it will extract "REQ"
    fileIdentifierNoNumNorProjectRegex: /\b[A-Z]+(?=-\d+)/, // Select only the artifact from "REQ-001" it will extract "REQ"
    fileExtensionExtractionRegex: /(?<=\.)[a-z]+/, // Selects from a . to find the extension
    fileTitleAvoidExtensionReg: /^[^.]+/, // Select all file title data before the "."
    /**
     * Guidelines:
     * - Specific file title characteristics that the algorithm should use to classify the files pointed as connections
     */
    classificationGuidelines: {
    Architecture: ["VS", "ADR"], // Verify Artifact for clasification
    Requirements: ["REQ"], // Verify Artifact for clasification,
    Prototypes: [], // Hard Written links not part of automatic mapping but must persist !TODO
    Core: ["js"],
    Client: ["py"],
    Verification: [],
    Other: []
    },
    
};

/**
 * Data structures initialization
 */

/** @type {import("./TraceabilityPipeline.js").TraceableFile} */
/** @type {import("./TraceabilityPipeline.js").ArtifactRelatedFileConnection } */

const artifactRelatedToFiles = {};

/** @type {import("./TraceabilityPipeline.js").innerItem} */
/** @type {import("./TraceabilityPipeline.js").DirectoryAndFileMap} */

const dirsAndFileMap = {
    files: [],
    dirs: [],
};

/**
 * The Main Execution Thread
 */


/** @param {string} vaultPath - Must be the path of the folder over which the files must be scan and mapped be perform */
export default function runTraceabilityPipeline(vaultPath = CONFIG.vaultPath /* Default argument */){
    console.log('🚀 Starting Traceability Pipeline...');

    try{
    
        /** 
         * 1. Map the files:
         * - Takes the data structure  dirsAndFileMap and populates it
         * - Stores the files avoiding the exclude list
         */
        SearchAndDivide(vaultPath, CONFIG.excludeList, dirsAndFileMap); 
        
        /**
         * 2. Identify files with connections and map it related files:
         * - Populates artifactRelatedToFiles with the relationships and keys(system artifact identifier)
         */
        ExtractDataAndMatch(dirsAndFileMap, artifactRelatedToFiles, CONFIG.treaceabilityKeyWords.start, CONFIG.treaceabilityKeyWords.end, CONFIG.acceptedSystemArtifacts  )

        /**
         * 3. Artifact with connection looping time:
         * - Iterate over the artifactRelatedToFiles keys which are the artifact that are mention as a connection in another file
         * - In each iteration perform the key steps for the autolinkrefacto feature
         */

        /** @type {string[]} */
        const artifactsWithConnections = Object.keys(artifactRelatedToFiles)

        for (const artifact of artifactsWithConnections) {
            
            // 4. Find the artifact path
            const currentArtifactPath = ts.findArtifactFile(artifact, dirsAndFileMap.files, CONFIG.fileTitleIdentifierFilteringRegex, CONFIG.fileNameFilterRegex )
            
            //5. Access the artifact connections and classify them
            const currentArtifactClassifiedConnections = ts.classifyArtifactConnections(artifactRelatedToFiles[artifact], CONFIG.classificationGuidelines, CONFIG.fileIdentifierNoNumFilteringRegex, CONFIG.fileExtensionExtractionRegex, CONFIG.acceptedSystemArtifacts )

            /** 6. Build a markdown table:
             *  - Determine wheather the artifact selected should have header or not
             *  - Extract the artifact identifier e.g: "REQ" from the current format "REQ-000"
             */

            const identifierNoNum = artifact.match(CONFIG.fileIdentifierNoNumNorProjectRegex)?.[0]; // Useful data for step 6 and 7

            let connectionMDTable = ''; //Stores the connection data ready to append to the artifact

            if(identifierNoNum){
                
                if(CONFIG.markdownHeaderGuidelines.noHeader.includes(identifierNoNum)){
                    connectionMDTable = ts.buildMarkdownConnectionTable(false, currentArtifactClassifiedConnections, currentArtifactPath, CONFIG.fileTitleAvoidExtensionReg);
                }
                else if(CONFIG.markdownHeaderGuidelines.header.includes(identifierNoNum)){
                    connectionMDTable = ts.buildMarkdownConnectionTable(true, currentArtifactClassifiedConnections, currentArtifactPath, CONFIG.fileTitleAvoidExtensionReg);
                }
                else{
                    throw new Error(`Invalid identifier ${identifierNoNum} not part of system artfacts ${JSON.stringify(CONFIG.acceptedSystemArtifacts)}` )}
            }
            else { 
                throw new Error(`No valid artifact found in the key ${artifact} from object ${JSON.stringify(artifactRelatedToFiles)}`);
            }

            // 7. Access and Modify the artifact file updating successfully the connections
            ts.writeConnectionsToArtifact(identifierNoNum, currentArtifactPath, connectionMDTable);
        }
    }
    catch (error) {
        console.error('❌ FATAL ERROR in Main Thread:');
        console.error(error.message);

        throw error
        process.exit(1); // Fail the execution thread cleanly
    }

}

