/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Settings from 'Settings';
import queryString from 'query-string';
import ChatBotIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

// eslint-disable-next-line require-jsdoc
function AISearchAssistant() {
    const [showChatbot, setShowChatbot] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chatbotDisabled, setChatbotDisabled] = useState(false);
    const [tenantDomain, setTenantDomain] = useState('carbon');

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const toggleClearChatbot = () => {
        setShowChatbot(!showChatbot);
        // setMessages([introMessage]);
    };

    const handleDisableChatbot = () => {
        setChatbotDisabled(true);
    };

    useEffect(() => {
        const { app: { customUrl: { tenantDomain: customUrlEnabledDomain } } } = Settings;
        let tenantID = '';
        if (customUrlEnabledDomain !== 'null') {
            tenantID = customUrlEnabledDomain;
        } else {
            const { location } = window;
            if (location) {
                const { tenant } = queryString.parse(location.search);
                if (tenant) {
                    tenantID = tenant;
                }
            }
        }
        setTenantDomain(tenantID);
    }, []);

    let content;

    if (chatbotDisabled) {
        content = null;
    } else if (showChatbot) {
        content = (
            <Box position='absolute' bottom={24} right={24}>
                <ChatBotIcon toggleChatbot={toggleChatbot} handleDisableChatbot={handleDisableChatbot} chatbotDisabled={chatbotDisabled} />
            </Box>
        );
    } else {
        content = (
            <ChatWindow
                toggleChatbot={toggleChatbot}
                toggleClearChatbot={toggleClearChatbot}
                messages={messages}
                setMessages={setMessages}
                tenantDomain={tenantDomain}
            />
        );
    }

    return <div>{content}</div>;
}

export default AISearchAssistant;
