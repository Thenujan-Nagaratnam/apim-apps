/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import 'react-resizable/css/styles.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import Tooltip from '@mui/material/Tooltip';
import RestartAltTwoToneIcon from '@mui/icons-material/RestartAltTwoTone';

function Header(props) {
    const {
        toggleChatbot, toggleFullScreen, isClicked, handleReset, handleClear,
    } = props;
    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            marginBottom={0}
            borderBottom={1}
            borderColor='#1f84a1'
        >
            <Box>
                <IconButton
                    onClick={toggleFullScreen}
                    style={{ alignSelf: 'flex-end', padding: '12px' }}
                >
                    {isClicked ? (
                        <KeyboardDoubleArrowRightTwoToneIcon fontSize='large' />
                    ) : (
                        <KeyboardDoubleArrowLeftTwoToneIcon fontSize='large' />
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
                    onClick={toggleChatbot}
                    style={{ alignSelf: 'flex-end', padding: '12px' }}
                >
                    <ExpandMoreTwoToneIcon fontSize='large' />
                </IconButton>

                <IconButton
                    onClick={handleClear}
                    style={{ alignSelf: 'flex-end', padding: '18px' }}
                >
                    <CloseTwoToneIcon fontSize='medium' />
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
    handleClear: PropTypes.func.isRequired,
};
export default Header;
