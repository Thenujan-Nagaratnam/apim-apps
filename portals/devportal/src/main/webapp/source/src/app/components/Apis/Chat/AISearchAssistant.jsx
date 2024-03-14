/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Settings from 'Settings';
import queryString from 'query-string';
import ChatBotIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

// eslint-disable-next-line require-jsdoc
function AISearchAssistant() {
    const introMessage = {
        role: 'assistant',
        // eslint-disable-next-line max-len
        content: 'Hi there! I\'m Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?',
    };
    const getMessages = () => {
        const messagesJSON = localStorage.getItem('messages');
        const loadedMessages = JSON.parse(messagesJSON);
        return loadedMessages;
    };

    const [showChatbot, setShowChatbot] = useState(true);
    const [messages, setMessages] = useState(getMessages);
    const [chatbotDisabled, setChatbotDisabled] = useState(false);
    const [tenantDomain, setTenantDomain] = useState('carbon');

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const toggleClearChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const handleDisableChatbot = () => {
        setChatbotDisabled(true);
    };

    useEffect(() => {
        const messagesJSON = JSON.stringify(messages);
        localStorage.setItem('messages', messagesJSON);
    }, [messages]);

    useEffect(() => {
        try {
            const messagesJSON = localStorage.getItem('messages');
            if (messagesJSON) {
                const loadedMessages = JSON.parse(messagesJSON);
                setMessages(loadedMessages);
            } else {
                // const defaultMessages = ['Hello!', 'Welcome to the chat app.', 'Start chatting now!'];
                setMessages([introMessage]);
                localStorage.setItem('messages', JSON.stringify(messages));
            }
        } catch (error) {
            console.error('Error loading messages from localStorage:', error);
        }
    }, []);

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
                introMessage={introMessage}
            />
        );
    }

    return <div>{content}</div>;
}

export default AISearchAssistant;
