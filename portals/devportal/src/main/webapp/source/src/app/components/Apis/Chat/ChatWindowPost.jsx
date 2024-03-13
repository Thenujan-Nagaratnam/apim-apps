/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from 'AppData/api';
import {
    Container, Box, Modal, Typography,
} from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ChatMessages from './ChatMessages';
import Header from './Header';

// import ErrorBox from './ErrorBox';
/**
 * Renders Chat Messages view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Window view.
 */
function ChatWindow(props) {
    const {
        toggleChatbot, toggleClearChatbot, messages, setMessages, tenantDomain, introMessage,
    } = props;

    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const responseRef = useRef([]);
    const [isError, setIsError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    const handleOpen = () => setIsError(true);
    const handleClose = () => setIsError(false);

    const apiCall = (query, action) => {
        setLoading(true);
        const restApi = new Api();
        return restApi
            .postAisearchassistant(
                query, action, tenantDomain, messages,
            )
            .then((result) => {
                responseRef.current = [...responseRef.current, { role: 'assistant', content: result.body.content.trim() }];
                setMessages(responseRef.current);
                return result.body;
            })
            .catch((error) => {
                responseRef.current = [...responseRef.current, { role: 'assistant', content: 'Sorry, Something went wrong!' }];
                setMessages(responseRef.current);
                // console.log('error', error);

                if (error.response.status === 401) { // Unauthorized
                    setIsError(true);
                    setErrorMessage('Unauthorized access. Please login again.');
                    handleOpen();
                } else if (error.response.status === 429) { // Throttle limit exceeded
                    setIsError(true);
                    setErrorMessage('Too many requests. Please Subscribe to a higher plan.');
                    handleOpen();
                } else if (error.response.status === 403) { // No matching resource found
                    setIsError(true);
                    setErrorMessage('No matching resource found. Please try again.');
                    handleOpen();
                }
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClear = () => {
        setMessages([introMessage]);
        toggleClearChatbot();
    };

    const handleSend = async (message) => {
        // console.log('message', errorMessage);
        responseRef.current = [...responseRef.current, { role: 'user', content: message.content.trim() }];
        setMessages(responseRef.current);
        apiCall(message.content, 'chat');
    };

    const handleReset = () => {
        responseRef.current = [introMessage];
        setMessages([introMessage]);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        backgroundColor: '#91959c',
        p: 4,
    };

    useEffect(() => {
        responseRef.current = messages;
    }, []);

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : Math.max(window.innerWidth * 0.25, 500)}
            height={window.innerHeight}
            minConstraints={[Math.max(window.innerWidth * 0.25, 500), window.innerHeight]}
            maxConstraints={[window.innerWidth, window.innerHeight]}
            resizeHandles={['nw']}
            // margin={20}
            style={{
                position: 'fixed',
                // top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row-reverse',
                zIndex: 1200,
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
                style={{
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    backgroundColor: '#fff',
                    height: '100vh - 120px',
                    border: '10px',
                    borderColor: '#1f84a1',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    marginTop: '8px',
                    marginBottom: '8px',
                    marginRight: '8px',
                }}
            >
                {isError && (
                    <Modal
                        aria-labelledby='transition-modal-title'
                        aria-describedby='transition-modal-description'
                        closeAfterTransition
                        open={isError}
                        onClose={handleClose}
                    >
                        <Box sx={style}>
                            <Typography variant='h6' component='h2'>
                                Error
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {errorMessage}
                            </Typography>
                        </Box>
                    </Modal>
                )}

                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='flex'
                    style={{
                        height: '100%',
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
