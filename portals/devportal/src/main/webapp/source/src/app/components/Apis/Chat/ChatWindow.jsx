import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Box, IconButton } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import API from 'AppData/api';
import 'react-resizable/css/styles.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import Tooltip from '@mui/material/Tooltip';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
import ChatMessages from './ChatMessages';

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

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : window.innerWidth * 0.27}
            height={window.innerHeight}
            minConstraints={[window.innerWidth * 0.15, window.innerHeight]}
            maxConstraints={[window.innerWidth, window.innerHeight]}
            resizeHandles={['w']}
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
                />
            )}
        >
            <Container
                maxWidth={false}
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
                    flexDirection='column'
                    style={{
                        height: '100%',
                        background: '#ffffff',
                    }}
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        marginBottom={0}
                        borderBottom={1}
                        borderColor='#1f84a1'
                    >
                        <Box>
                            <IconButton
                                onClick={toggleFullScreen}
                                style={{ alignSelf: 'flex-end', padding: '12px' }}
                            >
                                {isClicked ? (
                                    <KeyboardDoubleArrowRightTwoToneIcon fontSize='large' />
                                ) : (
                                    <KeyboardDoubleArrowLeftTwoToneIcon fontSize='large' />
                                )}
                            </IconButton>
                            <Tooltip title='Reset Chat' placement='right'>
                                <IconButton
                                    onClick={handleReset}
                                    style={{ alignSelf: 'flex-end', padding: '12px' }}
                                >
                                    <RestartAltTwoToneIcon fontSize='large' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <IconButton
                                onClick={toggleChatbot}
                                style={{ alignSelf: 'flex-end', padding: '12px' }}
                            >
                                <ExpandMoreTwoToneIcon fontSize='large' />
                            </IconButton>

                            <IconButton
                                onClick={handleClear}
                                style={{ alignSelf: 'flex-end', padding: '18px' }}
                            >
                                <CloseTwoToneIcon fontSize='medium' />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box
                        flexGrow={1}
                        display='flex'
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
