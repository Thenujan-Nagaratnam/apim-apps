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
// import queryString from 'query-string';
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
    const [apiLimitExceeded, setApiLimitExceeded] = useState(false);
    const [apisCount, setApisCount] = useState(0);
    const responseRef = useRef([]);

    const pathName = window.location.pathname;
    const { search, origin } = window.location;

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    const apiCall = (query) => {
        setLoading(true);
        console.log(query);
        console.log(tenantDomain);

        const restApi = new Api();
        const messagesWithoutApis = messages.map(({ apis, ...message }) => message);

        return restApi
            .marketplaceChatExecute(
                query, 'chat', tenantDomain, messagesWithoutApis,
            )
            .then(() => {
            // try {
            //     responseRef.current = [...responseRef.current, { role: 'assistant', content: result.body.content.trim() }];
            //     setMessages(responseRef.current);
            //     return result.body;
            // } catch (error) {
            //     responseRef.current = [...responseRef.current, { role: 'assistant', content: 'Error occurred. Please try again later.' }];
            //     setMessages(responseRef.current);
            //     throw error;
            // }

                const apis = [{ id: 'e3d67198-eb8e-46f4-bb93-ef28385a8809', name: 'GramaCheckIdentityCheck-Endpoint7070' }, { id: 'e3d67198-eb8e-46f4-bb93-ef28385a8809', name: 'PoliceCheckAPIpvm-PoliceCheck' }, { id: 'e3d67198-eb8e-46f4-bb93-ef28385a8809', name: 'PizzaShackApi' }];

                const apiPaths = apis.map((api) => {
                    return { apiPath: `${origin}${pathName}/${api.id}/overview${search}`, name: api.name };
                });
                responseRef.current = [...responseRef.current, { role: 'assistant', content: "Hi, I'm your assistant. How can I help you?", apis: apiPaths }];
                setMessages(responseRef.current);
            //     return result.body;
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
        // const restApi = new Api();

        // return restApi
        //     .getApiCount(tenantDomain)
        //     .then((data) => {
        //         const apis = parseInt(data, 10);
        //         setApisCount(apis);
        //         if (apis > 1000) {
        //             setApiLimitExceeded(true);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, []);

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : Math.max(window.innerWidth * 0.25, 520)}
            height={window.innerHeight}
            minConstraints={[Math.max(window.innerWidth * 0.25, 520), window.innerHeight]}
            maxConstraints={[window.innerWidth, window.innerHeight]}
            resizeHandles={['w']}
            style={{
                position: 'fixed',
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
                        minWidth: '16px',
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
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    borderRadius: '8px',
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
