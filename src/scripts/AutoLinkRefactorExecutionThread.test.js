import runTraceabilityPipeline from "./AutoLinkRefactorExecutionThread"

import fs from 'fs';
import path from 'path';
import os from 'os';

//Recreate __dirname for ES Modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your main execution thread (adjust the path as needed)
// const { runTraceabilityPipeline } = require('../../src/index');

describe('Integration Test: Traceability Pipeline Auto Link Refactor feature', () => {
    let tempVaultPath;

    // ==========================================
    // 1. SETUP: Create Temp Copy
    // ==========================================
    beforeEach(() => {
        // Create a unique temporary directory prefix in the OS temp folder
        const tempPrefix = path.join(os.tmpdir(), 'traceability-test-');
        
        // OS generates a unique folder name (e.g., /tmp/traceability-test-aBc123)
        tempVaultPath = fs.mkdtempSync(tempPrefix);

        // Point to the static dummy-folder 
        const fixturePath = path.join(__dirname, 'dummy-folder');

        // Copy the entire dummy-folder into the temporary OS directory
        fs.cpSync(fixturePath, tempVaultPath, { recursive: true });

        // Optional: Log to terminal to see where it was created
        console.log(`[Setup] Temp environment ready at: ${tempVaultPath}`);
    });

    // ==========================================
    // 2. TEARDOWN: Delete Temp Copy
    // ==========================================
    afterEach(() => {
        if (tempVaultPath) {
            // Forcefully delete the temporary directory and all its contents
            fs.rmSync(tempVaultPath, { recursive: true, force: true });
            
            // Optional: Log to terminal to confirm deletion
             console.log(`[Teardown] Deleted temp environment at: ${tempVaultPath}`);
        }
    });

    // ==========================================
    // 3. THE TEST
    // ==========================================
    it('should inject correct relative path connections into the corresponding artifacts', async () => {
        // ACTION: Pass the TEMPORARY path to the main thread
        await runTraceabilityPipeline(tempVaultPath);

        // 1. Define the absolute paths to the dummy source files in the temp folder
        const mainCodeSourcePath = path.join(tempVaultPath, 'src', 'MainCode.js');
        const secondaryCodeSourcePath = path.join(tempVaultPath, 'src', 'SecondaryCode.py');

        // 2. define absolute paths to artifacts
        const vsArtifactPath = path.join(tempVaultPath, 'docs', 'architecture', 'PRO-VS-001_Flying_Feature.md');
        const adrArtifactPath = path.join(tempVaultPath, 'docs', 'architecture', 'PRO-ADR-001_Flying_Plugin.md');
        const reqArtifactPath = path.join(tempVaultPath, 'docs', 'requirements', 'PRO-REQ-001_Fly_Up.md');
        
        // ---------------------------------------------------------
        // OUTCOME: Verify VS-001 (PRO-VS-001_Flying_Feature.md)
        // Expected Connections: ADR-001, REQ-001, SecondaryCode.py
        // ---------------------------------------------------------
       
        //Calculate relative path and insert it in the expect to contain
        const vsToAdr = path.relative(path.dirname(vsArtifactPath), adrArtifactPath);
        const vsToReq = path.relative(path.dirname(vsArtifactPath), reqArtifactPath);
        const vsToSecondary = path.relative(path.dirname(vsArtifactPath), secondaryCodeSourcePath);

        const vsContent = fs.readFileSync(vsArtifactPath, 'utf8');

        // Check for the ADR connection
        expect(vsContent).toContain(`[PRO-ADR-001_Flying_Plugin](${vsToAdr})`);
        
        // Check for the REQ connection
        expect(vsContent).toContain(`[PRO-REQ-001_Fly_Up](${vsToReq})`);
        
        // Check for the Python source connection
        expect(vsContent).toContain(`[SecondaryCode](${vsToSecondary})`);

        //Optional:
        console.log(`New file content VS: ${vsContent}` )

        // ---------------------------------------------------------
        // OUTCOME 2: Verify ADR-001 (PRO-ADR-001_Flying_Plugin.md)
        // Expected Connections: MainCode.js
        // ---------------------------------------------------------
        
        //Calculate relative path and insert it in the expect to contain
        const adrToMain = path.relative(path.dirname(adrArtifactPath), mainCodeSourcePath);

        const adrContent = fs.readFileSync(adrArtifactPath, 'utf8');

        // Check for the JS source connection
        expect(adrContent).toContain(`[MainCode](${adrToMain})`);

        //Optional:
        console.log(`New file content ADR: ${adrContent}` )


        // ---------------------------------------------------------
        // OUTCOME 3: Verify REQ-001 (PRO-REQ-001_Fly_Up.md)
        // Expected Connections: MainCode.js
        // ---------------------------------------------------------

        //Calculate relative path and insert it in the expect to contain
        const reqToMain = path.relative(path.dirname(reqArtifactPath), mainCodeSourcePath);

        const reqContent = fs.readFileSync(reqArtifactPath, 'utf8');

        // Check for the JS source connection
        expect(reqContent).toContain(`[MainCode](${reqToMain})`);

        //Optional:
        console.log(`New file content REQ: ${reqContent}` )
    });
});