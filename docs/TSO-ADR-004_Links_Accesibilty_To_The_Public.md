---
Project: TraceabilitySystem
State: Pending
Description: Time resistant links within artifact for cross device sync
---
> [!info] 🏛️ TSO-ADR-004_Links_Accesibilty_To_The_Public
> **Date of Decision:**  2026-06-08 
> 
> ---
> *Connections*
> - **Related REQs:** | [TSO-REQ-018_Links_to_code_and_prototypes_from_REQs](TSO-REQ-018_Links_to_code_and_prototypes_from_REQs.md) |
> - **Related ADRs:** | [TSO-ADR-003_Global_Functional_File_Connection](TSO-ADR-003_Global_Functional_File_Connection.md) |
> ---
>  ## **1. The Context (Systemic Problem)**
>  ***Issue***
>
>One of the most useful functionalities this system could provide is the context switching reduction through redirection links connected to the code base, prototypes and tests. Ensuring the workflow as the lowest friction possible. However this kind of connection comes with its challenges:
>- Cross device working links
>- Repository functional links
>- Relevant accesible links and link that should't enable redirection (more private like files)
>
> ***Proposed Design***
> #### Public
>  Git Hub and Obsidian support relative 
>   ##  **2. The Decision**
> [State the exact system-wide rule, technology, or framework methodology being mandated across the entire ecosystem.]
> 
>  ## **3. The Consequences (Architectural Impact)**
> ***Impact***
> [e.g., Requires modifcation accros REQ-002 and REQ-003. Also the state flow of ADR-010 should be modify]
> ***Positive Effects***
> [e.g., Eliminates artifact fragmentation across the SDLC.]
> ***Constraints***
> [e.g., Requires strict exclusion from local cloud sync engines.]

