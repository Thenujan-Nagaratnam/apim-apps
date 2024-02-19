import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatBotIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

// eslint-disable-next-line require-jsdoc
function AISearchAssistant() {
    const introMessage = {
        role: 'assistant',
        // eslint-disable-next-line max-len
        content: 'Hi there! I\'m Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?',
    };
    const [showChatbot, setShowChatbot] = useState(true);
    const [messages, setMessages] = useState([introMessage]);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div>
            {showChatbot ? (
                <Box position='absolute' bottom={24} right={24}>
                    <ChatBotIcon toggleChatbot={toggleChatbot} />
                </Box>
            ) : (
                <ChatWindow toggleChatbot={toggleChatbot} messages={messages} setMessages={setMessages} />
            )}
        </div>
    );
}

export default AISearchAssistant;
