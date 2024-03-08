import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextField, IconButton, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles(() => ({
    button: {
        '&:hover': {
            backgroundColor: '#0fa2db', // Disable hover effect
        },
    },
}));

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
    const classes = useStyles();

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
        if (e.keyCode === 13 && e.shiftKey) {
            e.preventDefault();
            setContent(`${content}\n`);
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
                maxRows={12}
                InputProps={{
                    style: {
                        borderRadius: 20, padding: 14, backgroundColor: '#f9f9f9',
                    },
                    endAdornment: (
                        // eslint-disable-next-line max-len
                        <IconButton
                            className={classes.button}
                            onClick={handleSend}
                            size='small'
                            sx={{
                                marginRight: '0px',
                                width: '40px',
                                backgroundColor: '#0fa2db',
                                borderRadius: '6px',
                            }}
                        >
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
                    marginBottom: '300px',
                }}
            />
        </div>
    );
}

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
};
export default ChatInput;
