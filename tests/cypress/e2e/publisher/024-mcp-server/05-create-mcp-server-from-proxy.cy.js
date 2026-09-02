/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Utils from "@support/utils";

describe("publisher-023-02 : Create MCP Server by proxying an existing MCP Server endpoint", () => {
    const { publisher, password } = Utils.getUserInfo();
    const mcpName = Utils.generateName();
    const mcpContext = `/${mcpName.toLowerCase().replace(/-/g, '')}`;
    const mcpVersion = '1.0.0';
    // Placeholder upstream URL — the validation call is intercepted so it never leaves the browser.
    const upstreamUrl = 'https://mcp-test-upstream.example.com/v1';
    const mockMcpId = 'proxy-test-mcp-id-00000000-0000-0000';
    let createdMcpId;

    Cypress.on('uncaught:exception', () => false);

    beforeEach(() => {
        cy.loginToPublisher(publisher, password);
    });

    it.only("Creates MCP Server via the Proxy wizard using a mocked upstream endpoint", () => {
        // The proxy wizard validates the upstream URL by making a server-side MCP
        // initialize + tools/list call from the APIM backend. In CI the upstream is
        // unreachable, so we intercept both REST calls and return canned responses.
        // The intercepts stay active for the whole test so that DefaultAPIForm's own
        // endpoint-validation call (on wizardStep 2) is also handled.
        cy.intercept('POST', '**/mcp-servers/validate-mcp-server', {
            statusCode: 200,
            body: {
                isValid: true,
                errorMessage: null,
                content: null,
                toolInfo: {
                    operations: [
                        { target: 'getMenu', description: 'Return available menu items', feature: 'TOOL' },
                        { target: 'createOrder', description: 'Place a new order', feature: 'TOOL' },
                    ],
                },
            },
        }).as('validateMcp');

        cy.intercept('POST', '**/mcp-servers/generate-from-mcp-server', {
            statusCode: 201,
            body: { id: mockMcpId, name: mcpName, lifeCycleStatus: 'CREATED' },
        }).as('createMcp');

        cy.visit('/publisher/mcp-servers/create/mcp-proxy-from-endpoint', { timeout: 30000 });

        // ── Step 0: Provide MCP Server URL ────────────────────────────────────────
        cy.get('#mcp-server-url', { timeout: 30000 }).should('be.visible').type(upstreamUrl);

        // The "Next" button is enabled as soon as a URL is typed (no async validation yet).
        cy.contains('button', 'Next').should('not.be.disabled').click();

        // The click triggers the mocked POST /mcp-servers/validate-mcp-server call.
        cy.wait('@validateMcp', { timeout: 30000 });

        // ── Step 1: Select Tools ──────────────────────────────────────────────────
        // MCPProxyToolSelection renders a TransferList seeded with the 2 tools from
        // the mock toolInfo.operations response. Select all and move them right.
        cy.get('input[aria-label="all items selected"]', { timeout: 15000 })
            .first()
            .should('not.be.disabled')
            .click({ force: true });
        cy.get('button[aria-label="move selected right"]', { timeout: 10000 })
            .should('not.be.disabled')
            .click();

        cy.contains('button', 'Next').should('not.be.disabled').click();

        // ── Step 2: Fill MCP Server details ──────────────────────────────────────
        // The endpoint field is read-only (readOnlyAPIEndpoint=true); the upstream
        // URL is already set from step 0, so we only fill name / context / version.
        cy.get('#itest-id-apiname-input', { timeout: 15000 }).clear().type(mcpName);
        cy.get('#context').clear().type(mcpContext);
        cy.get('#itest-id-apiversion-input').clear().type(mcpVersion).blur();

        cy.contains('button', 'Create').should('not.have.class', 'Mui-disabled').click();
        cy.wait('@createMcp', { timeout: 30000 });

        // After creation the wizard redirects to the MCP Server overview page.
        cy.url({ timeout: 15000 }).should('match', /\/publisher\/mcp-servers\/[^/]+\/overview/);
        createdMcpId = mockMcpId;
    });

    afterEach(() => {
        // The MCP was created via a mocked response so it does not exist on the
        // server — the delete call is a no-op (404) and is silently ignored.
        if (createdMcpId) {
            Utils.deleteMCPServer(createdMcpId);
            createdMcpId = null;
        }
    });
});
