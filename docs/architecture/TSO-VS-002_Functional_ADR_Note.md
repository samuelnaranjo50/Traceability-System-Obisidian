---
Project: TraceabilitySystem
State: Pending
Description: What needs to be develop in order to have a functional ADR
---
## Connections

| Type                | Route                                                                                                                                                                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📕Architecture**  | `md` [TSO-ADR-003_Global_Functional_File_Connection](TSO-ADR-003_Global_Functional_File_Connection.md)                                                                                                                                                                                                                                      |
| 📓 **Requirements** | `md` [TSO-REQ-008_Template_Structure_ADR's](../requirements/TSO-REQ-008_Template_Structure_ADR's.md)  <br>`md` [TSO-REQ-012_Properties_For_ADR's_Traceability](../requirements/TSO-REQ-012_Properties_For_ADR's_Traceability.md) <br>`md` [TSO-REQ-019_Kanban_Dashboard_For_ADRs](../requirements/TSO-REQ-019_Kanban_Dashboard_For_ADRs.md) |



## Diagram
```mermaid
graph TD

KanBA[Kanban Board ADRs]---> |For status visualization| ADRs

%% ADR Artifacts
ADRs --- relativeLink(Relative Markdown Link)
ADRs --- ADRArtifact[ADR callout & links]
ADRs --- |Private Links| Reference[ Reference & link to the knowledgge base]


```
