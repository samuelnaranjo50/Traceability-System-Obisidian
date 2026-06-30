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
> [!success] **Scenario:** Folder File Mapping
> `Precondition - Action - Outcome`
> 
> **Given** the commit as been trigger , **When** the script begins , **Then** 
> - [ ] Find the root directory of the project path
> - [ ] Files and directories data including its name and path are store separated
> - [ ] Files of non interest store such as: `[.dsstore, react packages, .gitignore`, store  in an array are exclude from memory save by the helper function.
> - [ ] Data from files is read and specific keyword **@trace** follow by artifact identifiers `REQ` `VS` `ADR` are scan till the keyword **@end**, making sure is a valid identifier from the list of identifiers and that it contains a number ID.
> - [ ] If a match of this identifiers are found in one or more files an object for storage should contain the **identifier properties:** REQ, ADR and VS followed by an array that adds the path of the file to this section if found
> - [ ] If the folder contains more directories this process should be repeated for directories find in the root directory and directories of directories find within those **without loosing**g any data!!

 >[!success] **Scenario:** Regex Expression Extraction & filtering
> `Precondition - Action - Outcome`
> 
> **Given** the file data has been stored, **When** the code is iterating over the files extracting each file data one at the time , **Then** the regex filtering should work in the next order
> - [x] regex that extracts data between the keyword using `@trace` and end key char `@` to end the regex extraction
> - [x] regex that extracts from data between the keyword  **possible candidates** for an artifact identifier. It should store identifiers that match the next pattern: a `white space`followed by `uppercase letters` followed by a  hyphen `-` followed by numbers from 0-9
> - [x] regex that filters from the already selected candidates to the actual valid **artifacts identifiers** from a specified **list**. The algorithm should extract using regex the following data: **uppercase letters** without selecting the hyphen `-`
> 

 >[!success] **Scenario:** Multiple keyword mentions within a  File complex data extraction
> `Precondition - Action - Outcome`
> 
> **Given** the file data has been stored and the algorithm has extracted the data of the file **When** the regex match is perform , **Then** the regex should handle both files with on keyword mention and files with multiple keyword mentions
> - [x] uses a method that extracts 1 or more matches!
> 

> [!todo] **Scenario:** Finding the artifact where a list of connections should be added
> `Precondition - Action - Outcome`
> 
> **Given** the script has collected the `ArtifactRelatedFileConnection` & `DirectoryAndFileMap`  , **When** a artifact identifier e.g (REQ, ADR) is selected to find its path  , **Then** the algorithm should find the valid path of that artifact, making sure there are not duplicate artifacts with the same identifier and avoiding the helper artifact **"Analytical_Breakdown"** since it will contain the artifact identifier causing further trouble

> [!todo] **Scenario:** Writing the connections to the file
> `Precondition - Action - Outcome`
> 
> **Given** Artifacts have been map to the connected files or other artifact , **When** writing to files those connections , **Then**  
> - [x] Add the link with correct path to the correct Artifact file in the correct section excluding `analytical breakdown artifact` by identify a artifact followed by a name of "Analytical_Breakdown"
> - [x] Classify Related files: based on the name of the file and its extension classify the link to specific area
> - [x] Transform the link to be a relative link to the file
> - [x] If file is a REQ or VS artifacts add the text right below the YAML within the first section
> - [x] if file is an ADR find the `*Connections*` text followed by the delimeters and plug. the table below it with the blockquote `>` at the beginning
> - [x] Use  invisible token delimeters to identify where to plug the table span hidden is not render nor by obsidian nor by github  "`<span hidden data-connections-begin></span> ... <span hidden data-connections-end></span>`" 
> - [x] Based on the area add a emoji with semantic meaning
> 

> [!todo] **Scenario:** Handling hand written links that survive in the connection table like prototypes to figma or others
> `Precondition - Action - Outcome`
> 
> **Given** .... , **When** .... , **Then**
> 

> [!todo] **Scenario:** Main execution thread updates artifact connections successfully.
> `Precondition - Action - Outcome`
> 
> **Given** The target folder contains valid source files, files matching the "Avoid list", and target Markdown artifact files. , **When** When the main execution thread is executed against the target folder... , **Then** Then the system should:
> 
> 1. Ignore all files specified in the "Avoid list".
>     
> 2. Correctly classify and map the remaining source files to their corresponding artifacts.
>     
> 3. Generate a Markdown table containing the classified connections.
>     
> 4. Inject or update this table within the specific artifact Markdown file without altering the surrounding content.

## Analytical Breakdown

| **Problem Solving documentation** | **File**                                                                |
| --------------------------------- | ----------------------------------------------------------------------- |
| 2026-06-17                        | [TSO-REQ-020_Analytical_Breakdown](TSO-REQ-020_Analytical_Breakdown.md) |


--- 
###### Links: 

###### Reference :

- [[(Literature) Regex expression in Java Script]]
- [[File handling in Java (visual)]]
- [[(Literature) JavaScript cool loops and methods for selection and data modification]]
- [[(Literature)  Library for easy data extraction from markdown files]]
- [[(Literature) File handling features of node JS]] 
-  [[(Literature) jest support ES modules]]