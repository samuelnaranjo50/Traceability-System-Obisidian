//@trace REQ-020 @ 

/**
 * @typedef {object} innerItem
 * @property {string} name
 * @property {string} path
 */

/**
 * @typedef {object} DirectoryAndFileMap
 * @property {innerItem[]} files
 * @property {innerItem[]} dirs
 */

/** @type {DirectoryAndFileMap} */
/** @type {DirectoryAndFileMap} */



/** @type {DirectoryAndFileMap} */
export const mockTraceabilityDataDuplicates = {
    files: [
        {
            name: "PRO-ADR-001_Microkernel_Initialization.md",
            path: "/vault/architecture"
        },
        {
            name: "PRO-ADR-002_Storage_Driver_Bridge_Analytical_Breakdown.md",
            path: "/vault/architecture"
        },
        {
            name: "PRO-VS-001_High_Frequency_Queue_VS_Batch_Processing.md",
            path: "/vault/comparisons"
        },
        {
            name: "PRO-VS-003_GraphQL_VS_REST_Analytical_Breakdown.md",
            path: "/vault/comparisons"
        },
        {
            name: "PRO-VS-002_Core_Data_Ingestion_Pipeline.md",
            path: "/vault/requirements"
        },
        {
            name: "PRO-VS-002_Analytical_Breakdown.md",
            path: "/vault/requirements"
        },
        {
            name: "PRO-REQ-102_Memory_Boundary_Check_Analytical_Breakdown.md",
            path: "/vault/requirements"
        }
    ],
    dirs: []
};


/** @type {DirectoryAndFileMap} */
export const mockTraceabilityData = {
    files: [
        {
            name: "PRO-ADR-001_Microkernel_Initialization.md",
            path: "/vault/architecture"
        },
        {
            name: "PRO-ADR-002_Storage_Driver_Bridge_Analytical_Breakdown.md",
            path: "/vault/architecture"
        },
        {
            name: "PRO-VS-001_High_Frequency_Queue_VS_Batch_Processing.md",
            path: "/vault/comparisons"
        },
        {
            name: "PRO-VS-002_GraphQL_VS_REST_Analytical_Breakdown.md",
            path: "/vault/comparisons"
        },
        {
            name: "PRO-REQ-002_Core_Data_Ingestion_Pipeline.md",
            path: "/vault/requirements"
        },
        {
            name: "PRO-REQ-102_Memory_Boundary_Check_Analytical_Breakdown.md",
            path: "/vault/requirements"
        }
    ],
    dirs: []
};


/**
 * MOCK PROJECT
 * * 
 * * root/
 * ├── docs/
 * │   ├── architecture/
 * │   │   └── PRO-ADR-001_Microkernel.md
 * │   ├── comparisons/
 * │   │   └── PRO-VS-002_GraphQL_VS_REST.md                  <-- 📍 MOCK FILE STARTING POINT
 * │   └── requirements/
 * │       └── PRO-REQ-101_Data_Ingestion.md
 * ├── prototypes/
 * │   └── 01_proof_of_concept.py
 * ├── src/
 * │   ├── core/
 * │   │   └── pipeline.js
 * │   └── ui/
 * │       └── dashboard.jsx
 * ├── tests/
 * │   └── pipeline.test.js
 * └── README.md
 */

/**
* @typedef {Object} TraceableFile
* @property {string} name - Name of the file
* @property {string} path - Complete path including the file name
*/

/** @type {Record<string, TraceableFile[]>} classifiedConnections */

export const classifiedConnections = {
    "📕 Architecture": [
        {
            name: "PRO-ADR-001_Microkernel.md",
            path: "./docs/architecture/PRO-ADR-001_Microkernel.md"
        }
    ],
    "📓 Requirements": [
        {
            name: "PRO-REQ-101_Data_Ingestion.md",
            path: "./docs/requirements/PRO-REQ-101_Data_Ingestion.md"
        }
    ],
    "🧪 Prototypes": [
        {
            name: "01_proof_of_concept.py",
            path: "./prototypes/01_proof_of_concept.py"
        }
    ],
    "⚙️ Core Logic (Backend/Systems)": [
        {
            name: "pipeline.js",
            path: "./src/core/pipeline.js"
        }
    ],
    "🎨 Client Layer (Frontend/UI)": [
        {
            name: "dashboard.jsx",
            path: "./src/ui/dashboard.jsx"
        }
    ],
    "🛡️ Verification (Tests & Config)": [
        {
            name: "pipeline.test.js",
            path: "./tests/pipeline.test.js"
        }
    ],
    "📂 Other": [
        {
            name: "README.md",
            path: "./README.md"
        }
    ]
};