/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Api from 'AppData/api';
import {
    Container, Box,
} from '@mui/material';
import Alert from '@mui/material/Alert';
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
        toggleChatbot, toggleClearChatbot, messages, setMessages, tenantDomain, introMessage, user,
    } = props;

    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [apiLimitExceeded, setApiLimitExceeded] = useState(false);
    const [apisCount, setApisCount] = useState(0);
    const responseRef = useRef([]);

    const pathName = window.location.pathname;
    const { search, origin } = window.location;

    const [, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    const apiCall = (query) => {
        setLoading(true);

        const restApi = new Api();
        const messagesWithoutApis = messages.map(({ apis, ...message }) => message);

        return restApi
            .marketplaceChatExecute(
                query, tenantDomain, messagesWithoutApis,
            )
            .then((result) => {
                const { apis } = result.body;

                const apiPaths = apis.map((api) => {
                    return { apiPath: `${origin}${pathName}/${api.apiId}/overview${search}`, name: api.apiName };
                });
                responseRef.current = [...responseRef.current, { role: 'assistant', content: result.body.response, apis: apiPaths }];
                setMessages(responseRef.current);
                return result.body;
            })
            .catch((error) => {
                let content;
                try {
                    switch (error.response.status) {
                        case 401: // Unauthorized
                            content = 'Unauthorized access. Please login to continue.';
                            break;
                        case 429: // Token limit exceeded
                            content = 'Token Limit is exceeded. Please try again later.';
                            break;
                        case 403: // No matching resource found
                            content = 'No matching resource found. Please try again.';
                            break;
                        default:
                            content = 'Something went wrong Please try again later.';
                            break;
                    }
                } catch (err) {
                    content = 'Something went wrong Please try again later.';
                }

                const errorMessage = { role: 'assistant', content };
                responseRef.current = [...responseRef.current, errorMessage];
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
        responseRef.current = [...responseRef.current, { role: 'user', content: message.content.trim() }];
        setMessages(responseRef.current);
        apiCall(message.content);
    };

    const handleReset = () => {
        responseRef.current = [introMessage];
        setMessages([introMessage]);
    };

    useEffect(() => {
        responseRef.current = messages;
        setApisCount(5);
        setApiLimitExceeded(false);
        const restApi = new Api();

        return restApi
            .getMarketplaceChatApiCount()
            .then((data) => {
                const apis = parseInt(data.body.count, 10);
                setApisCount(apis);
                if (apis > 1000) {
                    setApiLimitExceeded(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : Math.max(window.innerWidth * 0.27, 520)}
            height={window.innerHeight - 110}
            minConstraints={[Math.max(window.innerWidth * 0.27, 520), window.innerHeight]}
            maxConstraints={[window.innerWidth, window.innerHeight - 110]}
            resizeHandles={['w']}
            style={{
                position: 'fixed',
                bottom: 48,
                right: 0,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row-reverse',
                zIndex: 1200,
            }}
            handle={(
                <span
                    style={{
                        width: '4px',
                        cursor: 'ew-resize',
                        minWidth: '4px',
                    }}
                />
            )}
        >
            <Container
                maxWidth={false}
                style={{
                    padding: 0,
                    backgroundColor: '#fff',
                    border: '2px solid #1f84a1',
                    boxShadow: '0 2px 2px rgba(0,0,0,0.3)',
                    borderRadius: '4px',
                    margin: '4px 4px 4px 0',
                }}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    // justifyContent='flex'
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
                    {apiLimitExceeded ? (
                        <Alert severity='warning' style={{ borderRadius: '0px', zIndex: 2999, padding: '0 10px 0 10px' }}>
                            {/* <AlertTitle>Warning</AlertTitle> */}
                            You have reached your maximum number of apis. The answers will be limited to the first 1000 apis.
                        </Alert>
                    ) : (
                        <Alert severity='info' style={{ borderRadius: '0px', zIndex: 2999, padding: '0 10px 0 10px' }}>
                            {`You have reached ${apisCount} apis out of 1000.`}
                        </Alert>
                    )}

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
                            user={user}
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
