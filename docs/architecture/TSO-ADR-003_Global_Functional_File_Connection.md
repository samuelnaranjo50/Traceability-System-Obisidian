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
> - **Related REQs:** | [TSO-REQ-018_Links_to_code_and_prototypes_from_REQs](../requirements/TSO-REQ-018_Links_to_code_and_prototypes_from_REQs.md) | [TSO-REQ-020_Automatic_Link_Refactor_Script](../requirements/TSO-REQ-020_Automatic_Link_Refactor_Script.md) |
> - **Related ADRs:** | [TSO-ADR-004_Links_Accesibilty_To_The_Public](TSO-ADR-004_Links_Accesibilty_To_The_Public.md) |
> ---
>  ## **1. The Context (Systemic Problem)**
>  ***Issue***
>  
>One of the most useful functionalities this system could provide is the context switching reduction through redirection links connected to the code base, prototypes and tests. Ensuring the workflow has the lowest friction possible. 
>
>I was using integrated Obsidian links `[[File]]` to connect the system files but this format is not supported by GitHub nor by code editors since it ignores it because it doesn't know the exact location of the file. The main issue is that it breaks the traceability system outside Obisidian which would't allow to navigate through the files in the web or the code editor of preference.
>
>Another challenge that the system must address is what happens if you change the code editor (the ideal is software resistant links non dependent to enterprise software). How is the to code link going to open the editor to maintain the functional link or is there a more resistant alternative??.
>
>Assets rendering such as images or videos must also be address properly so that it is not dependent on Obsidian routing.
>
>Lastly what happens if you modify the name of a file, how can you enable a feature of automatic renaming Obsidian like but with the new relative markdown functionality.
>
>  ***Propose Design***
>#### Markdown links: Relative & URL
>Write the relative markdown format for the link in the traceability system usage.
>##### Scenario A: Links to the Web...
>The *Objective* link a prototype to a Web App
>- Figma integration: you can use the relative markdown link to point to a specific frame (Left click -> copy as -> copy link to selection ) or the figma project itself. By using the project URL 
>>e.g: [See the prototype](https://www.figma.com/design/1jlWrBPUnkQp76lQ9eBFnW/CAPSTONE-PROJECT---TABLE-RESERVATION-SYSTEM---FRONT-END-PROFESSIONAL---META?node-id=2369-610&t=91fqzG8Md7gagjHQ-4)
>- CAD software integration: Copy the URL to a specific design sub-file in the navbar of the browser
>
>##### Scenario B: Tests and Code
>Use the relative path pattern for markdown
>##### Scenario C: Images
>Use the relative path pattern for markdown image rendering
>##### Scenario D:  Resistant from Obsidian to IDE and Github linkage (Dual-Layer Traceability Architecture)
>To ensure low friction while developing the project but ensure Docs are fully connected for anyone auditing it.
>Placing proprietary URIs within the docs make the system proprietary dependent introducing a failure point. Since the system ensures each code implementation is related to a REQ or an ADR leverage the inmutable ID, use:
>
>- **Developer workflow**: Global search & a connector comment
>- **Repository support** Relative markdown links in REQs and ADRs
>
>##### Scenario E: Auto-Refactor Engine
>Obsidian and VS Code (Probably other IDEs) both integrate an automatic link refactoring engine but it must be explicitly enabled. However for the IDE the refactoring engine is limited to the folder in which the file is store making it not possible to Automatically refactor code files or ADRs from REQS or REQ from ADRs.
>
>The only option to solve this is to leverage the git integration to trigger a **custom script** to automatically update any modified code file.
>
>##  **2. The Decision**
>>*For relative file paths:*
>- **Instead of:** `[[SYS-REQ-001_Auth_Protocol]]`
>- **Write this:** `[SYS-REQ-001 Auth Protocol](../SYS-REQ-001_Auth_Protocol.md)`
>  With this format Obsidian will understand the markdown link but also Git Hub or the code editor
>
>> For images embedding:
>- **Instead of:** `![[imageName.png]]`
>- **Write this:** `![OAuth Flow Diagram](../assets/oauth_flow.png)`
> 
>> For urls in the web (prototypes and others):
>
> **Write this:** `[The link to prototype e.x](http://sdkgjh/url/example)`
>> For IDE navigation dev workflow:
>
>When writing a code file add the ID of the REQ &/or ADR as a comment. Why as a comment? This way you can bypass entirely device dependent root link and avoid getting trapped by priopetary software and specific URI patters
>
>**Example in TypeScript/JavaScript:**
> ``` Typescript
> /**
>  * Handles user authentication and token generation.
>  * @trace OPT-REQ-025
>  * @trace OPT-ADR-005
>  */
> export class AuthController {
>     // implementation...
> }
> ```
>
>
>**Example in Python:**
> ```Python
> def generate_oauth_token(user_id):
>     """
>     Generates the secure OAuth token for the session.
>     Implements: OPT-REQ-025
>     """
>     # implementation...
> ```
> 
> - You know that your ID is a given [000], the you trigger global text search in the IDE  `Ctrl + Shift + F` (Windows/Linux) or `Cmd + Shift + F` (Mac). 
> - You type `Implements: REQ-[000]/ADR-[000] or simply REQ-[000]/ADR-[000]`
> - Then IDE will show you all files with that text `Implements: REQ-[000] or ADR-[000]
> 
> This way you connect the docs and the code in the dev workflow
> 
>> Obsidian Automatic refactoring:
>
>Enable the automatic Auto-Refactor Engine in obsidian and VS Code but be aware of its limitation 
>> The Custom Script for automatic refactoring:
>
>Implement a custom script trigger by git commit to update the code links automatically to ensure this system doesn't becomes a collection of broken links and a manual refactoring nightmare.
>
>  ## **3. The Consequences (Architectural Impact)**
>  
> ***Positive Effects***
> - Ensures Repository and IDE navigability. Anyone inspecting the repo will be able to navigate without friction using the relative markdown links
> - Introduces a workflow for Builder productivity through *global search*
> 
> ***Constraints***
> - Assets must be strictly store within the `assets` folder to ensure proper embedding
> - Code implementation must include a comment in the file with the REQ ID or ADR it implements. Making possible the Dev workflow
> - The  [TSO-REQ-018_Links_to_code_and_prototypes_from_REQs](../requirements/TSO-REQ-018_Links_to_code_and_prototypes_from_REQs.md) must explain the structure to link to specific paths for web prototypes and repo navigability inside a REQ
> - Obsidian auto-refactoring engine does not supports folder modification so ensure to be aware of that limitation
> - The Automatic Script should be implemented to ensure manual refactoring resistance in [TSO-REQ-020_Automatic_Link_Refactor_Script](../requirements/TSO-REQ-020_Automatic_Link_Refactor_Script.md)

---  
###### Reference :

- [[Enabling the Auto-Refactor engine in VS Code and Obsidian]]
