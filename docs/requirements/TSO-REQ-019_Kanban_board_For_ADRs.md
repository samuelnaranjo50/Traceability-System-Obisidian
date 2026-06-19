---
Status: 4-Done
Priority: P1-High
Project: TraceabilitySystem
Description: How do I need to set up the Kanban board in order for it to handle the ADRs properly, which features of the board I need to leverage
---


> [!abstract] User Story
> `User type - Action - Output`
> 
**As a** Builder,
**I want to** be able to visualize ADRs, create ADRs and manage the sate of my ADRs,
**So that** I can click a button and place note in the `architecture` folder, see the priority and the status at which the ADR currently is at

## Acceptance Criteria
>[!info] This will set the board to be group by the state
![](../assets/images/Screen%20Shot%202026-06-17%20at%203.12.32%20PM.png)

> [!success] **Scenario:** Kanban Queque Configuration
> `Precondition - Action - Outcome`
> 
> **Given** I have created a `base` with the correct identifier and set the view to `kanban` , **When** a new project is initialized , **Then** the view configurations should be set to:
> - *Group By:* State property
> - *Add cart to column folder:* Path to `architecture` folder in project
> 

> [!success] **Scenario:** Sort kanban configuration
> `Precondition - Action - Outcome`
> 
> **Given**  I have created a `base`  set the view to `kanban`  and configure the view , **When**  a new project is initialized , **Then** the sort settings shold be:
> - *Sort by:* Priority property A -> Z
> - *Sort by:* file name A -> Z

> [!success] **Scenario:** Filter and Properties configuration
> `Precondition - Action - Outcome`
> 
> **Given**  I have created a `base`  set the view to `kanban` , configure the view and configure the sort , **When**  a new project is initialized, **Then** the filter setting should be set replacing TSO with the project identifier:
>  ![](../assets/images/Screen%20Shot%202026-06-17%20at%203.17.31%20PM.png)
>  and the *`properties`* activated should be **priority**
