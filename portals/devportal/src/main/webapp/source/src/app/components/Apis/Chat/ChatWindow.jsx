import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from 'AppData/api';
import { Container, Box } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ChatMessages from './ChatMessages';
import Header from './Header';

/**
 * Renders Chat Messages view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Window view.
 */
function ChatWindow(props) {
    const {
        toggleChatbot, toggleClearChatbot, messages, setMessages,
    } = props;
    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    /**
    * API call to send query or get/clear chat History
    * @param {string} query - User query.
    * @param {string} action - Action to be performed.
    * @returns {Promise}.
    */
    const apiCall = (query, action) => {
        setLoading(true);
        const restApi = new API();
        return restApi
            .getAisearchassistant({ query, action })
            .then((result) => {
                setMessages(result.body.messages);
                return result.body.messages;
            })
            .catch((error) => {
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClear = () => {
        apiCall('clear chat history', 'clearChat');
        toggleClearChatbot();
    };

    const handleSend = async (message) => {
        apiCall(message.content, 'chat');
    };

    const handleReset = () => {
        apiCall('clear chat history', 'clearChat');
    };

    useEffect(() => {
        apiCall('get chat history', 'getChatHistory');
    }, []);

    useEffect(() => {
        const clearChatHistory = setTimeout(() => {
            apiCall('clear chat history', 'clearChat');
        }, 600000);

        return () => clearTimeout(clearChatHistory);
    }, [messages]);

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : window.innerWidth * 0.27}
            height={window.innerHeight}
            minConstraints={[window.innerWidth * 0.27, window.innerHeight]}
            maxConstraints={[window.innerWidth, window.innerHeight]}
            resizeHandles={['w']}
            // overflow='auto'
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row-reverse',
                zIndex: 9999,
            }}
            handle={(
                <span
                    style={{
                        width: '16px',
                        cursor: 'ew-resize',
                    }}
                >
                    <svg />
                </span>
            )}
        >
            <Container
                maxWidth={false}
                // overflow='auto'
                style={{
                    padding: '6px',
                    paddingLeft: '0px',
                    height: '100vh',
                }}
            >
                <Box
                    border={2}
                    borderColor='#1f84a1'
                    borderRadius={4}
                    display='flex'
                    // overflow='auto'
                    flexDirection='column'
                    justifyContent='flex-end'
                    style={{
                        height: '100%',
                        background: '#ffffff',
                    }}
                >
                    <Header
                        toggleChatbot={toggleChatbot}
                        toggleFullScreen={toggleFullScreen}
                        handleClear={handleClear}
                        handleReset={handleReset}
                        isClicked={isClicked}
                    />

                    <Box
                        flexGrow={1}
                        display='flex'
                        overflow='auto'
                        flexDirection='column'
                        justifyContent='flex-end'
                        marginTop={0}
                        padding={0}
                    >
                        <ChatMessages
                            messages={messages}
                            loading={loading}
                            onSend={handleSend}
                            onReset={handleReset}
                        />
                    </Box>
                </Box>
            </Container>
        </ResizableBox>
    );
}

ChatWindow.propTypes = {
    toggleChatbot: PropTypes.func.isRequired,
    toggleClearChatbot: PropTypes.func.isRequired,
    messages: PropTypes.instanceOf(Array).isRequired,
    setMessages: PropTypes.func.isRequired,
};
export default ChatWindow;
