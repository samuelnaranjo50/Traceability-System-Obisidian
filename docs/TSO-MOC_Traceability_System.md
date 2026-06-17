---
Project: TraceabilitySystem
Type: MOC
Status: 2-Active
Priority: P0-Critical
Objective: A deterministic, local-first traceability engine that unifies Docs-as-Code infrastructure, business validation, and technical execution into an automated Single Source of Truth. It eliminates cognitive decay and administrative friction by strictly coupling market-proof metrics to immutable code artifacts via zero-maintenance Dataview radars.
Repository: https://github.com/samuelnaranjo50/Traceability-System-Obisidian
Production:
---
# **Traceability System**
## **🏛️ System Architecture**
```mermaid
graph LR
KanPR[Kanban Board Projects] -->  |Status visualization of MOCs| MOC[Maps of Content for the project -MOC-]

MOC --> ADRs[ADRs]
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

## **⚡ Vertical Slicing**
Feature development connecting layers of the architecture to deliver one fully functional feature end-to-end.
``` dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID",  link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Vertical Slicing Documentation", Description 
	FROM "Projects/Traceability_System/docs/architecture"
	WHERE contains(file.name, "VS") AND status != "5-Deprecated"
	SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") 

```

## 📓 **Requirements (REQs)**
```dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID", link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Requisite", Description
FROM "Projects/Traceability_System/docs/requirements"
WHERE contains(file.name, "TSO-REQ") AND !endswith(file.name, "Analytical_Breakdown" ) AND status != "5-Deprecated"
SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") 
```
## **📕Architectural Decision Record (ADRs)**
```dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID", link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Architectural Decision", Description
FROM "Projects/<CompleteThePath>/docs/architecture"
WHERE contains(file.name, "TSO-ADR") AND !endswith(file.name, "Analytical_Breakdown" )
SORT regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") 
```

