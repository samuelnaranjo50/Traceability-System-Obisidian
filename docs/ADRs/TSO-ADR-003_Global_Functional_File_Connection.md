---
Project: TraceabilitySystem
State: Pending
Description:
---
> [!info] 🏛️ TSO-ADR-003_Global_Functional_File_Connection
> **Date of Decision:**  2026-06-04 
> 
> ---
> *Connections*
> - **Related REQs:** | [REQ](../REQs/TSO-REQ-018_Links_to_code_and_prototypes_from_REQs.md) |
> - **Related ADRs:** |  |
> ---
>  ## **1. The Context (Systemic Problem)**
>  ***Issue***
>  
>One of the most useful functionalities this system could provide is the context switching reduction through redirection links connected to the code base, prototypes and tests. Ensuring the workflow as the lowest friction possible. 
>
>I was using integrated Obsidian links `[[File]]` to connect the system files but this format is not supported by GitHub nor by code editors since it ignores it because it doesn't know the exact location of the file. The main issue is that it breaks the traceability system outside Obisidian which would't allow to navigate through the files in the web or the code editor of preference.
>
>Another challenge that the system must address is what happens if you change the code editor (the ideal is software resistant links non dependent to enterprise software). How is the to code link going to open the editor to maintain the functional link and 
>
>  ***Propose Design***
>#### Relative Markdown links
>Write the relative markdown format for the link in the traceability system usage.
>##### Scenario A: Links to the Web...
>The *Objective* link a prototype to a Web App
>- Figma integration: you can use the relative markdown link to point to a specific frame (Left click -> copy as -> copy link to selection ) or the figma project itself. by using the project URL 
>- CAD software integration: Copy the URL to a specific design sub-file in the navbar of the browser
>[See the prototype](https://www.figma.com/design/1jlWrBPUnkQp76lQ9eBFnW/CAPSTONE-PROJECT---TABLE-RESERVATION-SYSTEM---FRONT-END-PROFESSIONAL---META?node-id=2369-610&t=91fqzG8Md7gagjHQ-4)
>##### Scenario B: 
>##### Scenario C:    
>
>##  **2. The Decision**
>
>- **Instead of:** `[[SYS-REQ-001_Auth_Protocol]]`
>- **Write this:** `[SYS-REQ-001 Auth Protocol](../SYS-REQ-001_Auth_Protocol.md)`
>  With this format Obsidian will understand the markdown link but also Git Hub or the code editor
>
> 
>  ## **3. The Consequences (Architectural Impact)**
> ***Impact***
> [e.g., Requires modifcation accros REQ-002 and REQ-003. Also the state flow of ADR-010 should be modify]
> ***Positive Effects***
> [e.g., Eliminates artifact fragmentation across the SDLC.]
> ***Constraints***
> [e.g., Requires strict exclusion from local cloud sync engines.]

