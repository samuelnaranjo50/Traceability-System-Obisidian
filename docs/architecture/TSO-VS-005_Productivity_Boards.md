---
Project: OptiStock
State: Pending
Description: Have a kanban board that allows me to quickly group and identify the state or status of a given ADR, REQ or MOC
---
## Connections

| Type                | Route                                                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📕Architecture**  |                                                                                                                                                                                                                                                                 |
| 📓 **Requirements** | [TSO-REQ-004_Kanban_Board_REQs](../requirements/TSO-REQ-004_Kanban_Board_REQs.md)<br>[TSO-REQ-016_Kanban_Projects](../requirements/TSO-REQ-016_Kanban_Projects.md)<br>[TSO-REQ-019_Kanban_board_For_ADRs](../requirements/TSO-REQ-019_Kanban_board_For_ADRs.md) |


## Diagram
```mermaid
graph TD
KanPR[Kanban Board Projects] --> |Status visualization of MOCs| MOC[Maps of Content for the project -MOC-]
KanBR[Kanban Board REQs] --> |For state visualization| REQs[REQs]
KanBA[Kanban Board ADRs]--> |For status visualization| ADRs[ADRs]


```
