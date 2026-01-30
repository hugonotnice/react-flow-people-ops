// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 Hugo Soares Nascimento

/**
 * Orchestrator Template Schema as requested by user.
 * This represents the design-time definition of an orchestration flow.
 */
export interface OrchestratorAction {
    type: 'startJourney' | 'condSwitch';
    args: {
        // For 'startJourney'
        journeyId?: string;
        // For 'condSwitch'
        switch?: string;
        cases?: Record<string, string>; // value -> nextActionIdentifier
    };
    offset: number; // number of days of execution before last conditional
    executionHour: number; // 0-23
    executionMinute: number; // 0-59
    nextAction?: string; // identifier of next action
    previousAction?: string; // identifier of next action, needed for offset validation
}

export interface OrchestratorTemplate {
    _id: string;
    name: string;
    createdAt: string; // ISO Date string
    version: string;
    nextOrchestrator?: string; // ObjectId?
    firstAction: string; // action identifier
    actions: Record<string, OrchestratorAction>;
}

/**
 * Orchestrator Instance Schema.
 * Represents a running instance of a template for a specific user.
 */
export interface ActionExecution {
    identifier: string;
    dateExecution: string;
}

export interface OrchestratorInstance {
    _id: string;
    orchestratorTemplateId: string;
    createdAt: string;
    startDate: string;
    userId: string;
    status: 'active' | 'completed' | 'cancelled' | 'error';

    currentAction: string; // action identifier
    nextExecutionDate: string;
    lastConditionalDate: string;
    actionExecutionHistory: ActionExecution[];

    actions: Record<string, OrchestratorAction>;
}
