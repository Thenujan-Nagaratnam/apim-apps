import React, { useState } from 'react';
import { Container, Box, IconButton } from '@mui/material';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import ChatMessages from './ChatMessages';

/**
 * Renders Chat Messages view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Window view.
 */
function ChatWindow(props) {
    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const toggleFullScreen = (e) => {
        e.preventDefault();
        setIsClicked(!isClicked);
    };

    const handleSend = async (message) => {
        const updatedMessages = [...props.messages, message];

        props.setMessages(updatedMessages);
        setLoading(true);

        setTimeout(() => {
            // eslint-disable-next-line no-shadow
            props.setMessages((messages) => [
                ...messages,
                {
                    role: 'assistant',
                    content: 'Hi, How can I help you?',
                },
            ]);
            setLoading(false);
        }, 10);
    };

    const handleReset = () => {
        props.setMessages([
            {
                role: 'assistant',
                // eslint-disable-next-line max-len
                content: 'Hi there! I\'m Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?',
            },
        ]);
    };

    // const handleResize = (event, { size }) => {
    //   console.log(size.width);
    //   console.log(window.outerWidth);
    //   console.log(window.window.screen.availWidth);
    // };

    // useEffect(() => {
    //   scrollToBottom();
    // }, [messages]);

    // useEffect(() => {
    //     props.setMessages([
    //         {
    //             role: 'assistant',
    //             // eslint-disable-next-line max-len
    //             content: 'Hi there! I\'m Chatbot UI, an AI assistant. I can help you with th
    // ings like answering questions, providing information, and helping with tasks. How can I help you?',
    //         },
    //     ]);
    // }, []);

    return (

        <ResizableBox
            width={isClicked ? window.innerWidth : 480}
            height={window.innerHeight}
            minConstraints={[480, window.innerHeight]}
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

            }}
            handle={(
                <span
                    style={{
                        // backgroundColor: 'black',
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
                    borderRadius={5}
                    display='flex'
                    flexDirection='column'
                    style={{ height: '100%', backgroundColor: 'white' }} //  width: "100%",
                >
                    <Box
                        display='flex'
                        flexDirection='row'
                        justifyContent='space-between'
                        marginBottom={1}
                        // padding={-2}
                    >
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
                        <Box>
                            <IconButton
                                onClick={props.toggleChatbot}
                                style={{ alignSelf: 'flex-end', padding: '12px' }}
                            >
                                <ExpandMoreTwoToneIcon fontSize='large' />
                            </IconButton>

                            <IconButton
                                onClick={props.toggleChatbot}
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
                    >
                        <ChatMessages
                            messages={props.messages}
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

export default ChatWindow;
