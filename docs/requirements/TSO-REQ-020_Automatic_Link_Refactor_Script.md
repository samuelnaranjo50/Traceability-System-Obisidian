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
> [!todo] **Scenario:** General functionality
> `Precondition - Action - Outcome`
> 
> **Given** the commit as been trigger , **When** the script begins , **Then** 
> - [x] Find the root directory of the project path
> - [x] Files and directories data including its name and path are store separated
> - [x] Files of non interest store such as: `[.dsstore, react packages, .gitignore`, store  in an array are exclude from memory save by the helper function.
> - [ ] Data from files is read and specific keyword **@trace** follow by artifact identifiers `REQ` `VS` `ADR` are scan till the keyword **@end**, making sure is a valid identifier from the list of identifiers and that it contains a number ID.
> - [ ] If a match of this identifiers are found in one or more files an object for storage should contain the **identifier properties:** REQ, ADR and VS followed by an array that adds the path of the file to this section if found
> - [ ] If the folder contains more directories this process should be repeated for directories find in the root directory and directories of directories find within those **without loosing**g any data!!

 >[!todo] **Scenario:** Regex Expression Extraction & filtering
> `Precondition - Action - Outcome`
> 
> **Given** the file data has been stored, **When** the code is iterating over the files extracting each file data one at the time , **Then** the regex filtering should work in the next order
> - [ ] regex that extracts data between the keyword using `@trace` and end key char `@` to end the regex extraction
> - [ ] regex that extracts from data between the keyword  **possible candidates** for an artifact identifier. It should store identifiers that match the next pattern:  `uppercase letters` followed by a  hyphen `-` followed by numbers from 0-9
> - [ ] regex that filters from the already selected candidates to the actual valid **artifacts identifiers** from a specified **list**. The algorithm should extract using regex the following data: **uppercase letters** without selecting the hyphen `-`
> 
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