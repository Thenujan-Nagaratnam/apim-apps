/* eslint-disable no-constant-condition */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Container, Box,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import ChatMessages from '../ChatMessages';
import Header from '../Header';

/**
 * Renders Chat Messages view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Window view.
 */
function ChatWindow(props) {
    const {
        toggleChatbot, messages, setMessages, tenantDomain, introMessage,
    } = props;

    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [apiLimitExceeded, setApiLimitExceeded] = useState(false);
    const [apisCount, setApisCount] = useState(0);
    const responseRef = useRef([]);

    // const pathName = window.location.pathname;
    // const { search, origin } = window.location;

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    const apiCall = (query) => {
        setLoading(true);
        console.log(tenantDomain);

        // const restApi = new Api();
        // const messagesWithoutApis = messages.map(({ apis, ...message }) => message);

        // return restApi
        // .postAisearchassistant(
        //     query, tenantDomain, messagesWithoutApis,
        // )
        // .then(() => {
        //     // try {
        //     //     responseRef.current = [...responseRef.current, { role: 'assistant', content: result.body.content.trim() }];
        //     //     setMessages(responseRef.current);
        //     //     return result.body;
        //     // } catch (error) {
        //     //     responseRef.current = [...responseRef.current, { role: 'assistant', content: 'Error occurred. Please try again later.' }];
        //     //     setMessages(responseRef.current);
        //     //     throw error;
        //     // }

        setApiLimitExceeded(true);

        //     const apis = [{ id: 'e3d67198-eb8e-46f4-bb93-ef28385a8809', name: 'GramaCheckIdentityCheck-Endpoint7070' }, { id: 'e3d67198-eb8e-46f4-bb93-ef28385a8809', name: 'PoliceCheckAPIpvm-PoliceCheck' }, { id: 'e3d67198-eb8e-46f4-bb93-ef28385a8809', name: 'PizzaShackApi' }];

        //     const apiPaths = apis.map((api) => {
        //         return { apiPath: `${href}/${api.id}/overview${search}`, name: api.name };
        //     });
        //     responseRef.current = [...responseRef.current, { role: 'assistant', content: "Hi, I'm your assistant. How can I help you?", apis: apiPaths }];
        //     setMessages(responseRef.current);
        //     //     return result.body;
        // })

        fetch('https://e95488c8-8511-4882-967f-ec3ae2a0f86f-prod.e1-us-east-azure.choreoapis.dev/lgpt/marketplaceapi/marketplace-assistant-api-be2/v1.0/marketplace-assistant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line max-len
                Authorization: 'Bearer eyJ4NXQiOiJOalJrT0ROak1qZ3dPV0ZpTUdNMU9HUTRPV1E1TmpZMlpUWXpOakkyTnpnelkyVTJPREl5WmpFeE4yWTVNVEU0WVRoaE5ETTBPR0l6WW1JeE5qUmpZZyIsImtpZCI6Ik5qUmtPRE5qTWpnd09XRmlNR00xT0dRNE9XUTVOalkyWlRZek5qSTJOemd6WTJVMk9ESXlaakV4TjJZNU1URTRZVGhoTkRNME9HSXpZbUl4TmpSallnX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJmZWNiYzg2OS1kMDg3LTQ5Y2MtYThhNC03N2VkYmMzNGJmY2MiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6WyJfYmlrNVFRa2lPZ1B5cDRyOUFNY0VJSzc5UUVhIiwiY2hvcmVvOmRlcGxveW1lbnQ6cHJvZHVjdGlvbiJdLCJuYmYiOjE3MTA4MjMzMzYsImF6cCI6Il9iaWs1UVFraU9nUHlwNHI5QU1jRUlLNzlRRWEiLCJvcmdfaWQiOiJlOTU0ODhjOC04NTExLTQ4ODItOTY3Zi1lYzNhZTJhMGY4NmYiLCJpc3MiOiJodHRwczpcL1wvYXBpLmFzZ2FyZGVvLmlvXC90XC93c28yZGV2dG9vbHNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE3MTA5MDk3MzYsIm9yZ19uYW1lIjoid3NvMmRldnRvb2xzIiwiaWF0IjoxNzEwODIzMzM2LCJqdGkiOiJiODZmYzU2OS01YmMzLTQ2NmEtYjVjNC05YTU0NjM5MDlkNzkiLCJjbGllbnRfaWQiOiJfYmlrNVFRa2lPZ1B5cDRyOUFNY0VJSzc5UUVhIn0.zTc4YaJbvaYxiyLCgzqVlCpKLYfsZn6TvF_ryL65M5mOl7QYK-YPTlCllje_KU55ao9xtZ3Dy07Hyp2h9wgyiwL1QuCRyhL6mHTqm3Ak1aa5jZ7Vtl3euA-XfElzahuKdknL6Q99yXSpEU6dLS09V482nlc07AcdqZ6UDcq46D8Wl3zRB-m4d5zTtkYM_hLtmKI6rvIjUewVeIZNlJYQs57JEmnuegc9NiA64tRP8W2DJ9HzbgfqCG6MTZSSCKe3cbO3OPglCh3Cj8fNPQ8Ao5JE7FFG7xmROu5AtAoD-ik4tm9NW2dYFMZnq4jplGUe4CwJLw5J9JBD8PjHz6rfmA',
            },
            body: JSON.stringify({ message: query }),
        })
            .then((response) => {
                if (!response.body || !response.body.pipeTo) {
                    throw new Error('ReadableStream not available');
                }

                const reader = response.body.getReader();

                let stream = '';

                const processStream = async () => {
                    try {
                        while (true) {
                            // eslint-disable-next-line no-await-in-loop
                            const { done, value } = await reader.read();

                            if (done) {
                                break;
                            }

                            const streamData = new TextDecoder().decode(value);

                            stream += streamData;

                            responseRef.current = [...responseRef.current.slice(0, -1), { role: 'assistant', content: stream }]; // , apis: apiPaths
                            setMessages(responseRef.current);
                        }
                    } catch (error) {
                        // eslint-disable-next-line max-len
                        responseRef.current = [...responseRef.current.slice(0, -1), { role: 'assistant', content: 'Sorry, Something went wrong!' }];
                    }
                };

                responseRef.current = [...responseRef.current, { role: 'assistant', content: '' }];
                setMessages(responseRef.current);
                processStream();
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
        setApisCount(48);
        // fetch('http://localhost:7070/ai/marketplace-chat/api-count', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'text/plain',
        //     },
        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then((data) => {
        //         const apis = parseInt(data, 10);
        //         setApisCount(apis);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
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
                    style={{
                        height: '100%',
                    }}
                >
                    <Header
                        toggleChatbot={toggleChatbot}
                        toggleFullScreen={toggleFullScreen}
                        handleReset={handleReset}
                        isClicked={isClicked}
                    />
                    {apiLimitExceeded ? (
                        <Alert severity='warning' style={{ borderRadius: '0px', zIndex: 2999, padding: '0 10px 0 10px' }}>
                            You have reached your maximum number of apis. The answers will be limited to the first 1000 apis.
                        </Alert>
                    ) : (
                        <Alert severity='info' style={{ borderRadius: '0px', zIndex: 2999, padding: '0 10px 0 10px' }}>
                            {`The assistant is using ${apisCount} APIs to answer your questions.`}
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
    messages: PropTypes.instanceOf(Array).isRequired,
    setMessages: PropTypes.func.isRequired,
    tenantDomain: PropTypes.string.isRequired,
    introMessage: PropTypes.instanceOf(Object).isRequired,
};
export default ChatWindow;
