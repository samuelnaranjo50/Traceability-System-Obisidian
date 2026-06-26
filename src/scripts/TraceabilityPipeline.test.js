//@trace REQ-020 @ 

import ts from "./TraceabilityPipeline.js"
import { mockTraceabilityData } from "./TraceabilityPipelineMocks.js";
import { mockTraceabilityDataDuplicates } from "./TraceabilityPipelineMocks.js";
import { classifiedConnections } from "./TraceabilityPipelineMocks.js";

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
    })
})