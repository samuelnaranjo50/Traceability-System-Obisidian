```mermaid
graph LR

MOC[Maps of Content for the project] --> ADRs[ADRs]
MOC --> REQs[REQs]
MOC -->|Only when used| VS[Vertical Slicing VS Note]

KanBR[Kanban Board REQs] -.-> |For state visualization| REQs[REQs]
KanBA[Kanban Board ADRs]-.-> |For status visualization| ADRs

%% REQ Artifacts

REQs[REQs] -.- AutoConnections[Connections]
REQs[REQs] -.- UserStory[User Story]
REQs[REQs] -.- AcceptanceCriteria[Acceptance Criteria]
REQs[REQs] -.- AnalyticalBreakdown[Analytical Breakdown]
REQs[REQs] -.- |Private Links| Links[Private links & reference to the Knowledge base]

%% ADR Artifacts
ADRs -.- ADRArtifact[ADR callout & links]
ADRs -.- |Private Links| Reference[ Reference & link to the knowledgge base]

```




``` dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID",  link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Vertical Slicing Documentation", Description 
	FROM "Projects/Traceability_System_Obsidian/docs/architecture"
	WHERE contains(file.name, "VS") AND status != "5-Deprecated"
	SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") 

```

``` dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID", link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Requisite", Description
FROM "Projects/Traceability_System_Obsidian/docs/requirements"
WHERE contains(file.name, "TSO-REQ") AND !endswith(file.name, "Analytical_Breakdown" ) AND status != "5-Deprecated"
SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") 
```

```dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID Number", link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Architectural Decision", Description
FROM "Projects/Traceability_System_Obsidian/docs/architecture"
WHERE contains(file.name, "TSO-ADR") AND !endswith(file.name, "Analytical_Breakdown" )
```


```dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID Number", link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Architectural Decision", Description
FROM "Projects/Traceability_System_Obsidian/docs/architecture"
WHERE contains(file.name, "TSO-ADR") AND !endswith(file.name, "Analytical_Breakdown" )
SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") DESC LIMIT 1
```
