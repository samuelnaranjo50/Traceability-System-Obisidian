---
Project:
Type:
Status:
Priority:
Objective:
Repository:
Prototypes:
Production:
---
# ** Project Name**
## **🏛️ System Architecture**
```mermaid

```

## 📓 **Requirements (REQs)**
```dataview
TABLE WITHOUT ID regexreplace(file.name, "^.*?-(\\d+)_.*$", "$1") AS "ID", link(file.path, regexreplace(file.name, "^.*?\d+[_ \-]*", "")) AS "Requisite", Description
FROM "Projects/<CompleteThePath>/docs/requirements"
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

