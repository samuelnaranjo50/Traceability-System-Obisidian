---
Project: TraceabilitySystem
State: Complete
Description: Feature development connecting layers of the architecture to deliver one fully functional feature end-to-end. Specifying connections to ADRs & REQs
---
## Connections

| Type                | Route                                                                                                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📕Architecture**  |                                                                                                                                                                                                                                                      |
| 📓 **Requirements** | `md` [TSO-REQ-017_Vertical_Slicing_Note_Structure_Template](../requirements/TSO-REQ-017_Vertical_Slicing_Note_Structure_Template.md)<br>`md` [TSO-REQ-021_Vertical_Slicing_MOC_Template_&_Properties](../requirements/TSO-REQ-021_Vertical_Slicing_MOC_Template_&_Properties.md) |
## Diagram
```mermaid
graph TD
MOC[Maps of Content for the project -MOC-]
MOC --- ADRs(ADRs DataView)
ADRs --> VSnote[ Vertical Slicing Note ]
VSnote --- connections(Connections)
VSnote ---  diagram[Diagram]

```
