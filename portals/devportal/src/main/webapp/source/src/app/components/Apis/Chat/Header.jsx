/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'react-resizable/css/styles.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
// import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
// import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
// import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import Tooltip from '@mui/material/Tooltip';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';
// import ChatIcon from '@mui/icons-material/Chat';

const useStyles = makeStyles(() => ({
    button: {
        '&:hover': {
            backgroundColor: '#096183', // Disable hover effect
        },
    },
}));

function Header(props) {
    const {
        toggleChatbot, toggleFullScreen, isClicked, handleReset,
    } = props;
    const classes = useStyles();
    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            marginBottom={0}
            borderBottom={2}
            borderColor='#1f84a1'
            borderRadius='28px 28px 0 0'
            // backgroundColor='#096183'
            // style={{
            //     background: 'linear-gradient(to right, #096183, #3fb5e2)',
            // }}
        >
            <Box>
                <IconButton
                    onClick={toggleFullScreen}
                    style={{ alignSelf: 'flex-end', padding: '12px' }}
                >
                    {isClicked ? (
                        <FullscreenExitIcon fontSize='large' />
                    ) : (
                        <FullscreenIcon fontSize='large' />
                    )}
                </IconButton>
                <Tooltip title='Reset Chat' placement='right'>
                    <IconButton
                        onClick={handleReset}
                        style={{ alignSelf: 'flex-end', padding: '12px' }}
                    >
                        <RestartAltTwoToneIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box>
                <IconButton
                    sx={{
                        width: '160px',
                        backgroundColor: '#096183',
                        borderRadius: '6px',
                        alignSelf: 'flex-end',
                        padding: '10px',
                    }}
                    className={classes.button}
                >
                    <Typography variant='body1' color='#ffffff' marginLeft='10px'>AI-Assistant</Typography>
                </IconButton>
                <IconButton
                    onClick={toggleChatbot}
                    style={{ alignSelf: 'flex-end', padding: '12px', marginRight: '6px' }}
                >
                    <ExpandMoreTwoToneIcon fontSize='large' />
                </IconButton>
            </Box>
        </Box>
    );
}
Header.propTypes = {
    toggleChatbot: PropTypes.func.isRequired,
    toggleFullScreen: PropTypes.func.isRequired,
    isClicked: PropTypes.bool.isRequired,
    handleReset: PropTypes.func.isRequired,
    // handleClear: PropTypes.func.isRequired,
};
export default Header;
