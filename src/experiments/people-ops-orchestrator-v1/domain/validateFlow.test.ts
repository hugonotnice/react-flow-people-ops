import { describe, it, expect } from 'vitest';
import { validateFlow } from './validateFlow';
import { FlowDefinition } from './FlowDefinition';

describe('validateFlow', () => {
    it('should return an error if the flow has no intents', () => {
        const flow: FlowDefinition = {
            id: 'test-flow',
            name: 'Test Flow',
            intents: []
        };

        const errors = validateFlow(flow);
        expect(errors).toContain('Flow must contain at least one CommunicationIntent');
    });

    it('should return an error if the flow has no internal audience', () => {
        const flow: FlowDefinition = {
            id: 'test-flow',
            name: 'Test Flow',
            intents: [
                {
                    id: 'intent-1',
                    channel: 'email',
                    audience: 'external' as any, // Forcing an external audience
                    messageTemplate: 'Hello'
                }
            ]
        };

        const errors = validateFlow(flow);
        expect(errors).toContain('Flow must target at least one internal audience (employee, leader, or people_ops)');
    });

    it('should return no errors for a valid flow', () => {
        const flow: FlowDefinition = {
            id: 'test-flow',
            name: 'Test Flow',
            intents: [
                {
                    id: 'intent-1',
                    channel: 'slack',
                    audience: 'employee',
                    messageTemplate: 'Welcome!'
                }
            ]
        };

        const errors = validateFlow(flow);
        expect(errors.length).toBe(0);
    });
});
