//@trace REQ-020 @ 
import fs, {readFileSync } from "node:fs";
import path from "node:path";
import os from "os"
import ts from "./TraceabilityPipeline.js"
import { mockTraceabilityData, mockTraceabilityDataDuplicates, classifiedConnections, fileADRMock, fileREQsOrVSMock, tableNoHeaderMock, tableHeaderMock} from "./TraceabilityPipelineMocks.js";


const mocktitleArtifactIdentifierReg = /\b[A-Z]+-\d+/; //Regex for selecting Artifact format from text
const mocktitleFileNameReg = /(?<=_)[a-zA-Z_]+/; //Regex for selecting the name based on the underscore "_" convention given to the file


describe("Find artifact file by providing a file list and the artifact to find", () => {


    test("findArtifacFile method without duplicates finds the expected path", () => {


        const requestedPath = ts.findArtifactFile("VS-002", mockTraceabilityData.files, mocktitleArtifactIdentifierReg, mocktitleFileNameReg);

        expect(requestedPath).toBe("/vault/comparisons/PRO-VS-002_GraphQL_VS_REST_Analytical_Breakdown.md");
    });

    test('findArtifacFile method with duplicates stops execution', () => {
        // Wrap the throw in a anonymus function to avoid crash
        const executionBlock = () => {
            ts.findArtifactFile(
                "VS-002",
                mockTraceabilityDataDuplicates.files,
                mockTitleArtifactIdentifierReg,
                mockTitleFileNameReg
            );
        };

        // Assert that running this block triggers an intentional explosion
        expect(executionBlock).toThrow();

    })
});


const mocktitleAvoidExtensionReg = /^[^.]+/;
// Source file context path where the markdown table is going to be written
const mockCurrentArtifactPath = "./docs/comparisons/PRO-VS-002_GraphQL_VS_REST.md";

describe("Creates the expected markdown table", () => {

    test('Handles table creation and relative paths with header for REQ and VS artifacts', () => {


        const markdownOutput = ts.buildMarkdownConnectionTable(true, classifiedConnections, mockCurrentArtifactPath, mocktitleAvoidExtensionReg);
        // Confirm layout structural assertions
        expect(typeof markdownOutput).toBe("string");

        //Assert: Contains the connection header
        expect(markdownOutput).toContain("../architecture/PRO-ADR-001_Microkernel.md");

        // To navigate out of: "./docs/comparisons/" -> up to "./docs/architecture/"
        // The path calculation string should safely yield: "../architecture/PRO-ADR-001_Microkernel.md"
        expect(markdownOutput).toContain("../architecture/PRO-ADR-001_Microkernel.md");

        // Assert: Verify the regex extension extraction
        // Lookups should use brackets [PRO-ADR-001_Microkernel] avoiding ".md"
        expect(markdownOutput).toContain("[PRO-ADR-001_Microkernel]");

        // Assert: Verify root-level file lookup navigation
        // Moving from "./docs/comparisons/" -> up to root "./README.md" implies climbing two folders: "../../README.md"
        expect(markdownOutput).toContain("../../README.md");

        // Checking the return Format
        //console.log('This is the table:', markdownOutput);
    })

    test('Handles table creation and relative paths without header for ADR with no connections header', ()=>{
         const markdownOutput = ts.buildMarkdownConnectionTable(false, classifiedConnections, mockCurrentArtifactPath, mocktitleAvoidExtensionReg);
        // Confirm layout structural assertions
        expect(typeof markdownOutput).toBe("string");

        //Assert: Contains the connection header
        expect(markdownOutput).not.toContain("## Connections\n");

        // To navigate out of: "./docs/comparisons/" -> up to "./docs/architecture/"
        // The path calculation string should safely yield: "../architecture/PRO-ADR-001_Microkernel.md"
        expect(markdownOutput).toContain("../architecture/PRO-ADR-001_Microkernel.md");

        // Assert: Verify the regex extension extraction
        // Lookups should use brackets [PRO-ADR-001_Microkernel] avoiding ".md"
        expect(markdownOutput).toContain("[PRO-ADR-001_Microkernel]");

        // Assert: Verify root-level file lookup navigation
        // Moving from "./docs/comparisons/" -> up to root "./README.md" implies climbing two folders: "../../README.md"
        expect(markdownOutput).toContain("../../README.md");

        // Checking the return Format
        //console.log('This is the table for ADRs:', markdownOutput);

    })
})


describe("Crafting data for the new updated file with links and writing data to it", () => {
  test("Handling ADRs connection table insertion", () => {
    // Generate a safe, unique file path in the OS temp directory
   
    const tempFileName = `PRO-ADR-002_GraphQL_VS_REST${Date.now()}.md`; // Add timestamp to avoid collisions
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, tempFileName);

    fs.writeFileSync(tempFilePath, fileADRMock);

    // Write your modified Markdown data to this temporary file
    const result = ts.writeConnectionsToArtifact('ADR', tempFilePath, tableNoHeaderMock);

    //console.log(`DEBUG: What's being written in the file ADR type is: `, result);

    //ASSERT: Write the expected data
    expect(result).not.toContain("## Connections");
    expect(result).toContain("*Connections*");
    expect(result).toContain("| Type | Route |\n| :--- | :--- |");
    expect(result).toContain('<span hidden data-connections-begin></span>');
    expect(result).toContain('<span hidden data-connections-end></span>');

    // BEST PRACTICE: Clean up the file immediately after the function is done
    try {
      fs.unlinkSync(tempFilePath);
      console.log("Cleanup complete. Temp file deleted.");
    } catch (err) {
      console.error("Failed to delete temp file:", err);
    }
    
  })

  test("Handling REQs & VS connection table insertion", () => {
    // Generate a safe, unique file path in the OS temp directory
   
    const tempFileName = `PRO-REQ-002_GraphQL_VS_REST${Date.now()}.md`; // Add timestamp to avoid collisions
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, tempFileName);

    fs.writeFileSync(tempFilePath, fileREQsOrVSMock);

    // Write your modified Markdown data to this temporary file
    const result = ts.writeConnectionsToArtifact("VS", tempFilePath, tableHeaderMock);

    //console.log(`DEBUG: What's being written result for REQ or VS file writting is: `, result); - Temp Debug log

    //ASSERT: Write the expected data
    expect(result).toContain("## Connections");
    expect(result).not.toContain("*Connections*");
    expect(result).toContain("| Type | Route |\n| :--- | :--- |");
    expect(result).toContain('<span hidden data-connections-begin></span>');
    expect(result).toContain('<span hidden data-connections-end></span>');

    // BEST PRACTICE: Clean up the file immediately after the function is done
    try {
      fs.unlinkSync(tempFilePath);
      console.log("Cleanup complete. Temp file deleted.");
    } catch (err) {
      console.error("Failed to delete temp file:", err);
    }
    
  })
  
})
