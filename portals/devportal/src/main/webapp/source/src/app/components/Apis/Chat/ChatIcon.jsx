import React from 'react';
import Fab from '@mui/material/Fab';
import ChatIcon from '@mui/icons-material/Chat';
import Paper from '@mui/material/Paper';

/**
 * Renders Chat Icon view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders Chat Icon view.
 */
function ChatBotIcon(props) {
    return (
        <>
            <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
                <Fab color='primary' aria-label='chat' onClick={props.toggleChatbot}>
                    <ChatIcon />
                </Fab>
            </div>
            <Paper style={{
                display: 'flex', justifyContent: 'flex-end', position: 'fixed',
            }}
            />
        </>
    );
}

export default ChatBotIcon;
