/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatBotIcon from './ChatIcon';
import ChatWindow from './ChatWindow';

// eslint-disable-next-line require-jsdoc
function AISearchAssistant() {
    const [showChatbot, setShowChatbot] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chatbotDisabled, setChatbotDisabled] = useState(false);

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
