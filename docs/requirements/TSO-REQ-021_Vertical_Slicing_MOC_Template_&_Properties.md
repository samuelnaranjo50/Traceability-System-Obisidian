---
Project: TraceabilitySystem
Status: 4-Done
Priority:
Description: Store and visualize Vertical Slicing diagrams
status: 4-Done
---
## Connections

| Type                | Route                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| **📕Architecture**  |                                                                                                 |
| 📓 **Requirements** |                                                                                                 |
| **Others**          | [VS MOC dataview (TSO template)](../assets/templates/VS%20MOC%20dataview%20(TSO%20template).md) |


## Story
>[!abstract] User Story
> `User type - Action - Output`
> 
**As a** Builder,
**I want to** visualize the grouping of my vertical slicing `VS` notes and quickly insert the structure,
**So that** I can understand the architecture and relationship of the features (REQs) to develop, understand the current state of the feature and quickly.

## Acceptance Criteria


> [!success] **Scenario:** MOC Automatic Data View Behavior
> `Precondition - Action - Outcome`
> 
> **Given** I have inserted the MOC template , **When** I `cmd/ctrl + m`, select **`VS MOC dataview(TSO template)`** & set the path of the project architecture relative to the vault folder in the **`FROM`** keyword, **Then** i see the automatically build table containing:
> - displays 4 rows: ID, State, Vertical slicing documentation & description
> - No deprecated VS are shown
> - Is ordered low to highest (ASCD)
> - Only VS notes are shown

## Analytical Breakdown

| **Problem Solving documentation** | **File**                                                                |
| --------------------------------- | ----------------------------------------------------------------------- |
| 2026-06-16                        | [TSO-REQ-021_Analytical_Breakdown](TSO-REQ-021_Analytical_Breakdown.md) |

--- 
###### Links: 

###### Reference :