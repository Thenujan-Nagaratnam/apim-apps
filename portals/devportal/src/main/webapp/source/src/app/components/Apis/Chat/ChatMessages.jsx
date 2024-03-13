import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Icon } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import Loader from './Loader';

/**
 * Renders Chat Messages view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Messages view.
 */
function ChatMessages(props) {
    const { messages, loading, onSend } = props;
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <Box
            maxHeight='100%'
            display='flex'
            flexDirection='column'
            maxWidth='100%'
            justifyContent='flex-end'
        >
            <Box
                display='flex'
                justifyContent='center'
                overflow='auto'
                maxWidth='100%'
            >
                <Box
                    justifyContent='center'
                    maxWidth='1400px'
                    width='100%'
                >
                    {messages.map((message, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index} my={1}>
                            <ChatMessage message={message} />
                        </Box>
                    ))}

                    {loading && (
                        <Box
                            display='flex'
                            flexDirection='row'
                            maxWidth='100%'
                            justifyContent='flex-start'
                        >
                            <Icon
                                style={{
                                    alignSelf: 'flex', padding: '8px',
                                }}
                            >
                                <ChatIcon fontSize='medium' />
                            </Icon>
                            <Box
                                textAlign='left'
                                bgcolor='#f9f9f9'
                                borderRadius='10px'
                                px={3}
                                py={2.5}
                                style={{
                                    maxWidth: '30px',
                                }}
                            >
                                <Loader />
                            </Box>
                        </Box>
                    )}
                    <div ref={messagesEndRef} />
                </Box>
            </Box>

            <Box
                display='flex'
                justifyContent='center'
                maxWidth='100%'
            >
                <Box
                    mb={4}
                    ml={2.5}
                    mr={2.5}
                    mt={2.5}
                    width='90%'
                    maxWidth='1280px'
                    marginLeft='5%'
                    marginRight='5%'
                >
                    <ChatInput onSend={onSend} />
                </Box>
            </Box>
        </Box>
    );
}

ChatMessages.propTypes = {
    messages: PropTypes.instanceOf(Array).isRequired,
    loading: PropTypes.bool.isRequired,
    onSend: PropTypes.func.isRequired,
};
export default ChatMessages;
