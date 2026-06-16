---
Project: TraceabilitySystem
State: Complete
Description: All requirements related with the REQ note, each component
---
## Connections

| Type                | Route                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📕Architecture**  | `md` [TSO-ADR-003_Global_Functional_File_Connection](TSO-ADR-003_Global_Functional_File_Connection.md) <br>  [ ] Bases Plugin [ ] Bases view                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 📓 **Requirements** | `md` [TSO-REQ-007_Template_Acceptance_Criteria](TSO-REQ-007_Template_Acceptance_Criteria.md) <br>`md` [TSO-REQ-013_Analytical_Breakdown_Artifact](TSO-REQ-013_Analytical_Breakdown_Artifact.md) <br>`md` [TSO-REQ-018_Links_to_code_and_prototypes_from_REQs](TSO-REQ-018_Links_to_code_and_prototypes_from_REQs.md) <br>`md` [TSO-REQ-006_Template_User_Stories](TSO-REQ-006_Template_User_Stories.md) <br>`md` [TSO-REQ-011_Properties_For_Requisite_Traceability](TSO-REQ-011_Properties_For_Requisite_Traceability.md) <br>`md` [TSO-REQ-020_Automatic_Link_Refactor_Script](../requirements/TSO-REQ-020_Automatic_Link_Refactor_Script.md) |

## Diagram

```mermaid
graph TD

KanBR[Kanban Board REQs] --> |For state visualization| REQs[REQs]

%% REQ Artifacts
REQs[REQs] -.- traceability(Traceability properties for Kanban & MOC)
REQs[REQs] -.- AutoConnections[Connections]
REQs[REQs] -.- UserStory[User Story]
REQs[REQs] -.- AcceptanceCriteria[Acceptance Criteria]
REQs[REQs] -.- AnalyticalBreakdown[Analytical Breakdown]
REQs[REQs] -.- |Private Links| Links[Private links & reference to the Knowledge base]

```

