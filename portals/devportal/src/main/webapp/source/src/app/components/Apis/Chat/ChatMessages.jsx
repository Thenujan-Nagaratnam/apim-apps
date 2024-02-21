import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Box } from '@mui/material';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

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
        <Box display='flex' flexDirection='column'>
            <Box
                display='flex'
                flexDirection='column'
                p={0}
                paddingLeft={2.5}
                paddingRight={2.5}
                overflow='auto'
                maxHeight='calc(100vh - 152px)'
            >
                {messages.map((message, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Box key={index} my={1}>
                        <ChatMessage message={message} />
                    </Box>
                ))}

                {loading && (
                    <Box my={1}>
                        <div>Loading...</div>
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Box>

            <Box
                mb={1.5}
                ml={2.5}
                mr={2.5}
                mt={2.5}
                position='relative'
                bottom={8}
                left={0}
            >
                <ChatInput onSend={onSend} />
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
