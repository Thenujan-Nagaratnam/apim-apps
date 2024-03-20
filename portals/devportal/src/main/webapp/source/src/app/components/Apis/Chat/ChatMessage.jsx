/* eslint-disable react/no-array-index-key */
import React, { useRef } from 'react';
import { PropTypes } from 'prop-types';
import {
    Box, Typography, Card, CardContent,
} from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';

/**
 * Renders a single Chat Message view.
 * @param {JSON} props Parent props.
 * @returns {JSX} Renders single Chat Message view.
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

    const style2 = {
        textAlign: 'left',
        justifyContent: 'flex-start',
        backgroundColor: message.role === 'assistant' ? '#f9f9f9' : '#fff',
        color: 'black',
        borderRadius: '8px',
        overflow: 'auto',
        overflowX: 'auto',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        marginLeft: '24px',
        maxWidth: '84%',
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
            {message.role === 'assistant' && (
                <Box display='flex-start' alignItems='center' flexDirection='column' maxWidth='100%'>
                    <Box display='flex' alignItems='center' width='100%'>
                        <div style={style}>
                            <ChatIcon fontSize='small' style={{ fill: '#fff', stroke: '#fff' }} />
                        </div>
                        <Typography variant='body1' style={{ fontWeight: 'bold', fontSize: '12pt' }}>Assistant</Typography>
                    </Box>
                    {message.apis && (
                        <Box display='flex' flexDirection='row' flexWrap='wrap' marginLeft='26px' marginRight='16px' maxWidth='100%'>
                            {message.apis.map((api, index) => (
                                // eslint-disable-next-line max-len
                                <a key={index} href={api.apiPath} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'none', color: 'inherit', width: '33%' }}>
                                    <Card style={{
                                        margin: '0 10px 10px 0', minWidth: '130px', height: '56px', backgroundColor: '#f9f9f9',
                                    }}
                                    >
                                        <CardContent style={{ wordWrap: 'break-word' }}>
                                            <Typography
                                                variant='subtitle1'
                                                gutterBottom
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    cursor: 'pointer',
                                                    margin: 0,
                                                }}
                                            >
                                                {api.name}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </a>
                            ))}
                        </Box>
                    )}
                </Box>
            )}

            {message.role === 'user' && (
                <Box display='flex' alignItems='center'>
                    <div style={style}>
                        <PersonIcon fontSize='medium' style={{ fill: '#fff', stroke: '#fff' }} />
                    </div>
                    <Typography variant='body1' style={{ fontWeight: 'bold', fontSize: '12pt' }}>You</Typography>
                </Box>
            )}
            <Box
                style={{
                    ...style2,
                    maxWidth: '84%',
                }}
                ref={outerBoxRef}
                px={2}
                py={message.role === 'assistant' ? 2 : 0}
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
        apis: PropTypes.arrayOf(PropTypes.string), // Added propType for apis
    }).isRequired,
};
export default ChatMessage;
