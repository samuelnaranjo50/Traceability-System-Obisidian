---
Project: TraceabilitySystem
State: Approved
Priority: P0-Critical
Description:
---
> [!info] 🏛️ TSO-ADR-002 : Symlinks
> **Date of Decision:**  2026-06-04 
> 
> ---
> *Connections*
> - **Related REQs:** |  |
> - **Related ADRs:** |  |
> ---
>  ## **1. The Context (Systemic Problem)**
>  ***Issue***
>  
> The whole system relies in git versioning to ensure updates to requirements, code or other artifact are tracked . Enabling time travel across different system updates providing enough flexibility to experiment without breaking the project while maintaining a clean traceability.
> 
> To keep the system properly backup GitHub offers seamlessly integration with git so is the go to option. However integrating a git versioning system within a folder of the ***whole second brain notes*** breaks the granularity intended, just imagine having the versioning story of hundreds of projects that would be a complete mess and It would be impossible to open source or sharing it without sharing critical personal notes.t
> 
>
>  ***Propose Design***
>  
>#### *The Worm Whole*
>Creating a symlink worm whole enables the project files to be store in an independent location. Therefore allowing independent git tracking 
>
>   ##  **2. The Decision**
> The system will use **symlink** to connect the obsidian vault with the specific project folder. To maintain the integrity of the traceability across devices the **docs** folder must contain all related artifact that make part of the system such as: MOC, REQs, ADRs ...
> 
>  ## **3. The Consequences (Architectural Impact)**
> ***Impact***
>- This integration requires that the documents contain in the docs of the folder structure are specified to ensure integrity and proper cross device synchronization -> [[TSO-ADR-001_Project_Folder_structure]]
>
> ***Positive Effects***
> - Git can be properly integrate in the system, providing time machine functionality for the projects.
> - Control of versions and documented commits are enforce to allow cloud back up and cross device synchronization enforcing a clean change log.
> 
> ***Constraints***
> - Synchronization through cloud providers will not work so a manual `git pull` & `git push` must be integrated within the workflow for data transfer across devices [Add link to git workflow ADR]
> - A way to simulate this symlink connection in Android devices is necessary to allow white board problem solving with pencil.


## Analytical Breakdown

| **Problem Solving documentation** | **File**                             |
| --------------------------------- | ------------------------------------ |
| 2026-06-04                        | [[TSO-ADR-002_Analytical_Breakdown]] |

--- 
##### References

- [[What is a symlink]]
- [[Symlink Usage (visual)]]