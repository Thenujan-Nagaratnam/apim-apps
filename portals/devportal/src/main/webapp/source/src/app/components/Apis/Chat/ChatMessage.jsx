import React, { useRef } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Typography } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';

/**
 * Renders a single Chat Message view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders single Chat Message view.
 */
function ChatMessage(props) {
    const { message } = props;
    const outerBoxRef = useRef(null);

    const style = {
        width: '30px',
        height: '30px',
        backgroundColor: '#567189',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        margin: '10px 10px 10px 0px',
        borderRadius: message.role === 'assistant' ? '50% 50% 50% 0' : '50% 50% 50% 0',
    };

    const markdownOverrides = {
        heading1: {
            component: Typography,
            props: {
                variant: 'h6',
            },
        },
        heading2: {
            component: Typography,
            props: {
                variant: 'subtitle1',
            },
        },
        heading3: {
            component: Typography,
            props: {
                variant: 'subtitle2',
            },
        },
        heading4: {
            component: Typography,
            props: {
                variant: 'body1',
            },
        },
        heading5: {
            component: Typography,
            props: {
                variant: 'body2',
            },
        },
        heading6: {
            component: Typography,
            props: {
                variant: 'caption',
            },
        },
    };
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
        >
            { (message.role === 'assistant') && (
                <Box display='flex' alignItems='center'>
                    <div style={style}>
                        <ChatIcon fontSize='small' style={{ fill: '#fff', stroke: '#fff' }} />
                    </div>
                    <Typography variant='body1' style={{ fontWeight: 'bold', fontSize: '12pt' }}>Assistant</Typography>
                </Box>
            )}

            { (message.role === 'user') && (
                <Box display='flex' alignItems='center'>
                    <div style={style}>
                        <PersonIcon fontSize='medium' style={{ fill: '#fff', stroke: '#fff' }} />
                    </div>
                    <Typography variant='body1' style={{ fontWeight: 'bold', fontSize: '12pt' }}>You</Typography>
                </Box>
            )}
            <Box
                ref={outerBoxRef}
                textAlign='left'
                justifyContent='flex-start'
                bgcolor={message.role === 'assistant' ? '#f9f9f9' : '#fff'}
                color='black'
                borderRadius='8px'
                px={2}
                py={message.role === 'assistant' ? 2 : 0}
                overflow='auto'
                maxWidth='84%'
                overflowX='auto'
                wordWrap='break-word'
                whiteSpace='pre-wrap'
                marginLeft='26px'
            >
                <Typography>
                    <MuiMarkdown
                        overrides={markdownOverrides}
                    >
                        {message.content}
                    </MuiMarkdown>
                </Typography>
            </Box>
        </Box>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.shape({
        role: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
};
export default ChatMessage;
