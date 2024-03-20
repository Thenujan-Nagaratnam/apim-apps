/* eslint-disable require-jsdoc */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Settings from 'Settings';
import queryString from 'query-string';
import ChatBotIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

function AISearchAssistant() {
    const introMessage = {
        role: 'assistant',
        // eslint-disable-next-line max-len
        content: 'Hi there! I\'m Marketplace assistant. I can help you with finding APIs and providing information related to APIs. How can I help you?',
    };
    const getMessages = () => {
        const messagesJSON = localStorage.getItem('messages');
        const loadedMessages = JSON.parse(messagesJSON);
        return loadedMessages;
    };

    const [showChatbot, setShowChatbot] = useState(true);
    const [messages, setMessages] = useState(getMessages);
    const [chatbotDisabled, setChatbotDisabled] = useState(false);
    const [tenantDomain, setTenantDomain] = useState('carbon.super');

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const handleDisableChatbot = () => {
        setChatbotDisabled(true);
        setMessages([introMessage]);
    };

    useEffect(() => {
        const messagesJSON = JSON.stringify(messages);
        localStorage.setItem('messages', messagesJSON);
    }, [messages]);

    useEffect(() => {
        try {
            const messagesJSON = localStorage.getItem('messages');
            const loadedMessages = JSON.parse(messagesJSON);
            if (loadedMessages) {
                setMessages(loadedMessages);
            } else {
                setMessages([introMessage]);
                localStorage.setItem('messages', JSON.stringify([introMessage]));
            }
        } catch (error) {
            console.error('Error loading messages from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        if (window.location.search) {
            const { tenant } = queryString.parse(window.location.search);
            setTenantDomain(tenant);
        } else {
            const { app: { customUrl: { tenantDomain: customUrlEnabledDomain } } } = Settings;
            let tenantID = '';
            if (customUrlEnabledDomain !== 'null') {
                tenantID = customUrlEnabledDomain;
                setTenantDomain(tenantID);
            }
        }
    }, []);

    let content;

    if (chatbotDisabled) {
        content = null;
    } else if (showChatbot) {
        content = (
            <Box position='absolute' bottom={24} right={100}>
                <ChatBotIcon toggleChatbot={toggleChatbot} handleDisableChatbot={handleDisableChatbot} chatbotDisabled={chatbotDisabled} />
            </Box>
        );
    } else {
        content = (
            <ChatWindow
                toggleChatbot={toggleChatbot}
                messages={messages}
                setMessages={setMessages}
                tenantDomain={tenantDomain}
                introMessage={introMessage}
            />
        );
    }

    return <div>{content}</div>;
}

export default AISearchAssistant;
