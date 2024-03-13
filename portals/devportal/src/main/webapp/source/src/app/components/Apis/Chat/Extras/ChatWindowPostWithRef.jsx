/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from 'AppData/api';
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
        toggleChatbot, toggleClearChatbot, messages, setMessages, tenantDomain, introMessage,
    } = props;

    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const responseRef = useRef([]);

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    const apiCall = (query, action) => {
        setLoading(true);
        const restApi = new Api();
        return restApi
            .postAisearchassistant(
                query, action, tenantDomain, messages,
            )
            .then((result) => {
                responseRef.current = [...responseRef.current, { role: 'assistant', content: result.body.content }];
                setMessages(responseRef.current);
                return result.body;
            })
            .catch((error) => {
                responseRef.current = [...responseRef.current, { role: 'assistant', content: 'Sorry, Something went wrong!' }];
                setMessages(responseRef.current);
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
        responseRef.current = [...responseRef.current, { role: 'user', content: message.content }];
        setMessages(responseRef.current);
        apiCall(message.content, 'chat');
    };

    const handleReset = () => {
        responseRef.current = [introMessage];
        setMessages([introMessage]);
    };

    useEffect(() => {
        responseRef.current = messages;
    }, []);

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : Math.max(window.innerWidth * 0.25, 500)}
            height={window.innerHeight}
            minConstraints={[Math.max(window.innerWidth * 0.25, 500), 700]}
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
                zIndex: 9999,
            }}
            handle={(
                <span
                    style={{
                        width: '16px',
                        cursor: 'move',
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
                    backgroundColor: '#ffffff',
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
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='flex'
                    // marginLeft='100px'
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
                        // marginLeft='100px'
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
