import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatBot from './ChatIcon';
import ChatWindow from './ChatWindow';

// eslint-disable-next-line require-jsdoc
function AISearchAssistant() {
    const [showChatbot, setShowChatbot] = useState(true);

    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div>
            {showChatbot ? (
                <Box position='absolute' bottom={24} right={24}>
                    <ChatBot toggleChatbot={toggleChatbot} />
                </Box>
            ) : (
                <ChatWindow toggleChatbot={toggleChatbot} />
            )}
        </div>
    );
}

export default AISearchAssistant;
