import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatBotIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

/**
 * Renders AI Assistant view..
 * @returns {JSX} renders AI Assistant view.
 */
function AISearchAssistant() {
    const introMessage = {
        role: 'assistant',
        // eslint-disable-next-line max-len
        content: 'Hi there! I\'m Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?',
    };
    const [showChatbot, setShowChatbot] = useState(true);
    const [messages, setMessages] = useState([introMessage]);
    const [chatbotDisabled, setChatbotDisabled] = useState(false);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    const toggleClearChatbot = () => {
        setShowChatbot(!showChatbot);
        setMessages([introMessage]);
    };

    const handleDisableChatbot = () => {
        setChatbotDisabled(true);
    };

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
            />
        );
    }

    return <div>{content}</div>;
}

export default AISearchAssistant;
