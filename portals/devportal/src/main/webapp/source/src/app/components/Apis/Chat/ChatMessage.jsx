import React, { useRef } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Typography } from '@mui/material';
// import { MuiMarkdown } from 'mui-markdown';

/**
 * Renders a single Chat Message view..
 * @param {JSON} props Parent pros.
 * @returns {JSX} renders single Chat Message view.
 */
function ChatMessage(props) {
    const { message } = props;
    const outerBoxRef = useRef(null);

    // const markdownOverrides = {
    //     heading1: {
    //         component: Typography,
    //         props: {
    //             variant: 'h6',
    //         },
    //     },
    //     heading2: {
    //         component: Typography,
    //         props: {
    //             variant: 'subtitle1',
    //         },
    //     },
    //     heading3: {
    //         component: Typography,
    //         props: {
    //             variant: 'subtitle2',
    //         },
    //     },
    //     heading4: {
    //         component: Typography,
    //         props: {
    //             variant: 'body1',
    //         },
    //     },
    //     heading5: {
    //         component: Typography,
    //         props: {
    //             variant: 'body2',
    //         },
    //     },
    //     heading6: {
    //         component: Typography,
    //         props: {
    //             variant: 'caption',
    //         },
    //     },
    // };
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
        >
            <Box
                ref={outerBoxRef}
                textAlign='left'
                bgcolor={message.role === 'assistant' ? '#f9f9f9' : '#0fa2db'}
                color='black'
                borderRadius='10px'
                px={3}
                py={2}
                style={{
                    maxWidth: '80%', wordWrap: 'break-word',
                    // , marginLeft: '10%', marginRight: '10%',
                }}
            >
                <Typography>
                    {/* <MuiMarkdown> */}
                    {message.content}
                    {/* </MuiMarkdown> */}
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