import React, { useRef } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Typography, Icon } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
// import Fab from '@mui/material/Fab';

/**
 * Renders a single Chat Message view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders single Chat Message view.
 */
function ChatMessage(props) {
    const { message } = props;
    const outerBoxRef = useRef(null);

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
            flexDirection='row'
            maxWidth='100%'
            justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            marginLeft='1%'
            marginRight='1%'
        >
            { (message.role === 'assistant') && (
                // <Fab
                //     color='primary'
                //     variant='round'
                //     padding='0px'
                // >
                //     <ChatIcon fontSize='medium' />
                // </Fab>
                // <div style={{
                //     width: '40px',
                //     height: '40px',
                //     borderRadius: '50%',
                //     backgroundColor: '#1f84a1',
                //     border: '1px solid #1f84a1',
                //     alignItems: 'center',
                //     justifyContent: 'center',
                //     display: 'flex',
                // }}
                // >
                //     <ChatIcon fontSize='medium' />
                // </div>
                <Icon
                    style={{
                        alignSelf: 'flex', padding: '12px', borderRadius: '50%', borderWeight: '1px', borderColor: '#1f84a1',
                    }}
                >
                    <ChatIcon fontSize='medium' />
                </Icon>
            )}
            <Box
                ref={outerBoxRef}
                textAlign='left'
                bgcolor={message.role === 'assistant' ? '#f9f9f9' : '#7FC7D9'}
                color='black'
                borderRadius='10px'
                px={3}
                py={2}
                // overflow='auto'
                style={{
                    maxWidth: '80%',
                    overflowX: 'auto',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    // marginLeft: '5%',
                    // marginRight: '5%',
                }}
            >
                <Typography>
                    <MuiMarkdown
                        overrides={markdownOverrides}
                    >
                        {message.content}
                    </MuiMarkdown>
                </Typography>
            </Box>
            { (message.role === 'user') && (
                <Icon
                    style={{
                        alignSelf: 'flex', padding: '12px',
                    }}
                >
                    <PersonIcon fontSize='large' />
                </Icon>
            )}
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
