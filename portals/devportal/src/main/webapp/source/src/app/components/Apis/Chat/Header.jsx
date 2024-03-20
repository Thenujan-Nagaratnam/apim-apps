/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
// import Alert from '@mui/material/Alert';

// import { makeStyles } from '@mui/styles';
import 'react-resizable/css/styles.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import Tooltip from '@mui/material/Tooltip';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

// const useStyles = makeStyles(() => ({
//     button: {
//         '&:hover': {
//             backgroundColor: '#096183',
//         },
//     },
// }));

function Header(props) {
    const {
        toggleChatbot, toggleFullScreen, isClicked, handleReset,
    } = props;
    // const classes = useStyles();
    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            borderBottom={0.5}
            borderColor='#0f0f0f'
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
            <Box display='flex'>
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
};
export default Header;
