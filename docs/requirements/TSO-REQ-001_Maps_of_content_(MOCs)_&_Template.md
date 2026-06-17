---
Status: 2-Active
Priority: P0-Critical
Project: TraceabilitySystem
Description: The portal that connects the whole project documentation, provides automatic mapping to the content without manual intervention
---
## Connections

| Type                | Route                                                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📕Architecture**  |                                                                                                                                                                                                |
| 📓 **Requirements** | `md` [TSO-REQ-017_Vertical_Slicing_Structure](TSO-REQ-017_Vertical_Slicing_Structure.md)<br>`md` [TSO-REQ-010_Properties_For_MOC_Traceability](TSO-REQ-010_Properties_For_MOC_Traceability.md) |


## Story

>[!abstract] User Story
> `User type - Action - Output`
> 
**As a** Builder,
**I want to** have a central dashboard from which I can visualize all the REQs & ADRs including the last one created of this also the architecture of the application, and the vertical slicing approach for each collection of features,
**So that** I can quickly navigate and read through the project elements. 

## Acceptance Criteria

> [!todo] **Scenario A:** Template insertion 
> `Precondition - Action - Outcome`
> 
> **Given** I have created a MOC note `PROJECTID-MOC_Naming_`  , **When** I click `cmd/ctrl + m` and select **`MOC note (TSO template)`** , **Then** the note should adopt the following structure:
> - Properties: project, type, status, priority, objective, repository, production
> - System architecture: contains a mermaid block ready to type the overview diagram
> - (Optional) Vertical slicing: Contains the DataView code block with the selection syntax written to select *Vertical slicing notes* (missing project path)
> - Requirements: Contains the DataView code block with the selection syntax written to select *requirements* (missing project path)
> - Architectural Decision Record:  Contains the DataView code block with the selection syntax written to select *decision records* (missing project path)

> [!todo] **Scenario B:** Requirements DataView automatic artifact mapping
> `Precondition - Action - Outcome`
> 
> **Given** I have inserted the MOC template , **When** I match the project path in the **`FROM`** keyword in the REQs block, **Then** the table maps all the *requirements* that are not deprecated and matches the next structure: 
> - ID
> - Requisite: Name context and file linkage
> - Description

> [!todo] **Scenario C:** Architectural Decision Record DataView automatic artifact mapping
> `Precondition - Action - Outcome`
> 
>  **Given** I have inserted the MOC template , **When** I match the project path in the **`FROM`** keyword in the ADRs block, **Then** the table maps all theArchitectural Decision Records that are not deprecated and matches the next structure: 
> - ID
> - Architectural Decision: Name context and file linkage
> - Description

> [!todo] **Scenario D:** Optional Vertical Slicing automatic artifact mapping
> `Precondition - Action - Outcome`
> 
> **Given** I have inserted the MOC template , **When** I click `cmd/ctrl + m`, select **`VS MOC dataview (TSO template)`**  and match the project path in the **`FROM`** keyword in the *vertical slicing* block, **Then** the table maps all the *requirements* that are not deprecated and matches the next structure: 
> - ID
> - Vertical Slicing Documentation: Name context and file linkage
> - Description

## Analytical Breakdown

| **Problem Solving documentation** | **File**                                                                |
| --------------------------------- | ----------------------------------------------------------------------- |
| 2026-06-13                        | [TSO-REQ-001_Analytical_Breakdown](TSO-REQ-001_Analytical_Breakdown.md) |

--- 
###### Links: 

###### Reference :