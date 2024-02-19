import React, { useState, useRef, useEffect } from 'react';
import { TextField, IconButton, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// eslint-disable-next-line require-jsdoc
function ChatInput(props) {
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
        props.onSend({ role: 'user', content });
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
                autoHideDuration={1500}
                onClose={handleCloseNotification}
                message='Please enter a message'
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    transform: 'translate(50%, 50%)',
                    marginBottom: '200px', // Adjust as needed to position the notification next to the chat input
                }}
            />
        </div>
    );
}

export default ChatInput;
