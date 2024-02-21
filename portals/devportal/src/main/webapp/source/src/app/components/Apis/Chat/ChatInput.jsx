import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

/**
 * Renders Chat Input view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Input view.
 */
function ChatInput(props) {
    const { onSend } = props;
    const [content, setContent] = useState('');
    const [notificationOpen, setNotificationOpen] = useState(false);
    const textareaRef = useRef(null);

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.length > 4000) {
            setNotificationOpen(true);
            return;
        }
        setContent(value);
    };

    const handleSend = () => {
        if (!content) {
            setNotificationOpen(true);
            return;
        }
        onSend({ role: 'user', content });
        setContent('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleCloseNotification = () => {
        setNotificationOpen(false);
    };

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [content]);

    return (
        <div>
            <TextField
                placeholder='Type a message...'
                value={content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                fullWidth
                multiline
                size='small'
                maxRows={2}
                InputProps={{
                    style: { borderRadius: 20 },
                    endAdornment: (
                        <IconButton onClick={handleSend} size='small'>
                            <SendIcon />
                        </IconButton>
                    ),
                }}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={notificationOpen}
                autoHideDuration={500}
                onClose={handleCloseNotification}
                message='Please enter a message'
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: 'translate(50%, 50%)',
                    marginBottom: '200px',
                }}
            />
        </div>
    );
}

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
};
export default ChatInput;
