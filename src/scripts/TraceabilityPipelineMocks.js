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

/** @type {Record<string, TraceableFile[]>} classifiedConnections  - The object containing the files connected to a given Artifact*/

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


/**
 * FILE MOCK ADR
 * @type {string} fileADRMock - Mock file with ADR artifact structure, with empty connections
 */

export const fileADRMock = `
---
Project: TraceabilitySystem
State: Approved
Priority: P0-Critical
Description:
---
> [!info] 🏛️ TSO-ADR-002 : Symlinks
> **Date of Decision:** 2026-06-04 
> 
> ---
> *Connections*
> <span hidden data-connections-begin></span>
> 
> <span hidden data-connections-end></span>
> 
> ---
>  ## **1. The Context (Systemic Problem)**`;


/**
 * FILE MOCK ADR
 * @type {string} fileREQsOrVSMock - Mock file with REQ or VS artifact structure, with empty connections
 */

export const fileREQsOrVSMock = `---
Project: null
Status: null
Priority: null
Description: null
---

## Acceptance Criteria


--- 
###### Links: 

###### Reference :`


/**
 * TABLE MOCK ADR
 * @type {string} tableNoHeaderMock - Table data with delimiter and without
 */
export const tableNoHeaderMock = `
<span hidden data-connections-begin></span>
    
| Type | Route |
| :--- | :--- |
|**📕 Architecture**|[PRO-ADR-001_Microkernel](../../architecture/PRO-ADR-001_Microkernel.md) <br>|
|**📓 Requirements**|[PRO-REQ-101_Data_Ingestion](../../requirements/PRO-REQ-101_Data_Ingestion.md) <br>|
|**🧪 Prototypes**|[01_proof_of_concept](../../../prototypes/01_proof_of_concept.py) <br>|
|**⚙️ Core Logic (Backend/Systems)**|[pipeline](../../../src/core/pipeline.js) <br>|
|**🎨 Client Layer (Frontend/UI)**|[dashboard](../../../src/ui/dashboard.jsx) <br>|
|**🛡️ Verification (Tests & Config)**|[pipeline](../../../tests/pipeline.test.js) <br>|
|**📂 Other**|[README](../../../README.md) <br>|
    
<span hidden data-connections-end></span>`


/**
 * TABLE MOCK ADR
 * @type {string} tableHeaderMock - Table data with delimiter and with header
 */

export const tableHeaderMock = `## Connections

<span hidden data-connections-begin></span>

| Type | Route |
| :--- | :--- |
| **📕 Architecture** | [PRO-ADR-001_Microkernel](../../architecture/PRO-ADR-001_Microkernel.md) <br> |
| **📓 Requirements** | [PRO-REQ-101_Data_Ingestion](../../requirements/PRO-REQ-101_Data_Ingestion.md) <br> |
| **🧪 Prototypes** | [01_proof_of_concept](../../../prototypes/01_proof_of_concept.py) <br> |
| **⚙️ Core Logic (Backend/Systems)** | [pipeline](../../../src/core/pipeline.js) <br> |
| **🎨 Client Layer (Frontend/UI)** | [dashboard](../../../src/ui/dashboard.jsx) <br> |
| **🛡️ Verification (Tests & Config)** | [pipeline](../../../tests/pipeline.test.js) <br> |
| **📂 Other** | [README](../../../README.md) <br> |

<span hidden data-connections-end></span>`;