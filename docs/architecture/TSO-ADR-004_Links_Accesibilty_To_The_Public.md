---
Project: TraceabilitySystem
State: Pending
Description: " Link accessibility nuances"
---
> [!info] 🏛️ TSO-ADR-004_Links_Accesibilty_To_The_Public
> **Date of Decision:**  2026-06-08 
> 
> ---
> *Connections*
> - **Related REQs:** | [TSO-REQ-003_Requirements_Structure](../requirements/TSO-REQ-003_Requirements_Structure.md) |
> - **Related ADRs:** | [TSO-ADR-003_Global_Functional_File_Connection](TSO-ADR-003_Global_Functional_File_Connection.md) |
> ---
>  ## **1. The Context (Systemic Problem)**
>  ***Issue***
>
>One of the most useful functionalities this system could provide is the context switching reduction through redirection links connected to the code base, prototypes and tests. Ensuring the workflow as the lowest friction possible. 
>But keeping the knowledge base separated from the project itself is fundamental. Also ensuring only project links are clickable to avoid broken active links.
>
> ***Proposed Design***
> #### Wikilinks & Relative markdown links
>  - For knowledge base links use Wiki Links so that they are not rendered as clickable links in GitHub or the IDE. This includes: `Literature notes, Main notes and visual notes`
> 
>  - For project files and web links use relative markdown links. This will include `REQs, ADRs, Analytical breakdown, code, test, styles`
>  
>   ##  **2. The Decision**
>- Literature notes, Main notes and visual notes use **Wiki Links** `[[]]`
> - REQs, ADRs, Analytical breakdown, code, test, styles use **Relative Markdown Links** `[]()`
> - 
>  ## **3. The Consequences (Architectural Impact)**
> ***Positive Effects***
>-  Reviewers will not be confused by broken links that redirect to your knowledge system
>- Only project files will be rendered as links
> 




