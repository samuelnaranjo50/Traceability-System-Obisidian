---
Status: 2-Active
Priority: P2-Normal
Project: TraceabilitySystem
Description: A script that updates the links of code files trigger by a commit
---

## Story

>[!abstract] User Story
> `User type - Action - Output`
> 
**As a** Builder,
**I want to** avoid the friction and cognitive debt of having to switch files to create a connection to the reqs specially for those file that can not be linked by obsidian symlink folder, files outside of docs 
**So that** there is no need to manually refactor of links when name or folder is change or need to think about the path to the file. This way I avoid the debt of having broken links across the traceability system

## Acceptance Criteria
> [!todo] **Scenario:** 
> `Precondition - Action - Outcome`
> 
> **Given** the commit as been trigger , **When** the script begins , **Then** 
> - [x] Find the root directory of the project path
> - [x] Files and directories data including its name and path are store separated
> - [x] Files of non interest store such as: `[.dsstore, react packages, .gitignore`, store  in an array are exclude from memory save by the helper function.
> - [ ] Data from files is read and specific keyword **@trace** follow by artifact identifiers `REQ` `VS` `ADR` are scan till the keyword **@end**
> - [ ] If a match of this identifiers are found in one or more files an object for storage should contain the **identifier properties:** REQ, ADR and VS followed by an array that adds the path of the file to this section if found
> - [ ] If the folder contains more directories this process should be repeated for directories find in the root directory and directories of directories find within those **without loosing**g any data!!

## Analytical Breakdown

| **Problem Solving documentation** | **File**                                                                |
| --------------------------------- | ----------------------------------------------------------------------- |
| 2026-06-17                        | [TSO-REQ-020_Analytical_Breakdown](TSO-REQ-020_Analytical_Breakdown.md) |


--- 
###### Links: 

###### Reference :

- [[(Literature) Regex expression in Java Script]]
- [[File handling in Java (visual)]]
- 