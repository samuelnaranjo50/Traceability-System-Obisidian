---
Status: 4-Done
Priority: P0-Critical
Project: TraceabilitySystem
Description: How do I need to set up the kanban board in order for it to handle the REQs properly, which features of the board I need to leverage
status: 4-Done
---
## Story

>[!abstract] User Story
> `User type - Action - Output`
> 
**As a** Builder,
**I want to** be able to visualize REQs, create REQs and manage the status of my REQs,
**So that** I can click a button and place note in the `requirements` folder, see the priority and the status at which the REQ currently is at

## Acceptance Criteria

>[!info] This will set the board to be group by the status
![](../assets/images/Screen%20Shot%202026-06-17%20at%201.12.33%20PM.png)
![](../assets/images/Screen%20Shot%202026-06-17%20at%201.13.00%20PM.png)
>Next should be *yellow*


> [!success] **Scenario:** Kanban Queque Configuration
> `Precondition - Action - Outcome`
> 
> **Given** I have created a `base` a set the view to `kanban` , **When** a new project is initialized , **Then** the view configurations should be set to:
> - *Group By:* Status property
> - *Add cart to column folder:* Path to requirements folder in project
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
>  ![](../assets/images/Screen%20Shot%202026-06-17%20at%202.31.28%20PM.png)
>  and the *`properties`* activated should be **priority**

--- 
###### Links: 

###### Reference :