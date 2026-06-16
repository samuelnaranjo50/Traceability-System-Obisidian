---
status: 4-Done
priority: P0-Critical
Project: TraceabilitySystem
Description: Once the ADR'S structure is created you need to develop a ready to use template that translate to every MOC you'll create in the future
---
## Story

> [!abstract] User Story
> `User type - Action - Output`
> 
**As a** Builder,
**I want to** quickly insert a template 
**So that**  it can serve me as a framework to guide and globalized the creation of *Architectural Decision Records*

## Acceptance Criteria

> [!todo] **Scenario A:** Functional properties and callout
> `Precondition - Action - Outcome`
> 
> **Given** The ADR was created with proper naming convention , **When** the builder clicks `cmd + m` and selects `???` , **Then** the ADR template that includes properties and the callout ready to edit is inserted in the note


> [!todo] **Scenario B:** Correct Inner structure of the template
> `Precondition - Action - Outcome`
> 
> **Given** the template for ADRs was inserted successful , **When** I began editing. 
> **Then** the Builder can clearly see the structure defined in the analytical breakdown:
> - Date
> - Context
> - Decision
> - Consequences
> - Reference

> [!todo] **Scenario: C** Diagram Creation
> `Precondition - Action - Outcome`
> 
> **Given** the template for ADRs was inserted successful and I'm editing Decision section , **When** the builder click `cmd + m` and selects **`???`** , **Then** I can start creating the diagram as code


> [!todo] **Scenario D:** Complex problem solving
> `Precondition - Action - Outcome`
> 
> **Given** the ADR is being edited and no easy solution can be found , **When** I decide to crete a board to think about it and I simply insert below the callout of the template **`Analytical Breakdown files traceability (TSO template)`** , **Then** It properly appears in the ADR file

## Analytical Breakdown

| **Problem Solving documentation** | **File**                             |
| --------------------------------- | ------------------------------------ |
| 2026-06-03                        | [[TSO-REQ-008_Analytical_Breakdown]] |


--- 
###### Links: 

- [[Mermaid Code Block (TSO template)]]
- [[ADR (TSO template)]]

###### Reference :

#TraceabilitySystem

- [[(Literature) Creating the Ultimate Traceability system for my own solo dev methodology]]