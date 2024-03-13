import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes for animation
const l7Animation = keyframes`
    33% { background-size: calc(100%/3) 0%, calc(100%/3) 100%, calc(100%/3) 100%; }
    50% { background-size: calc(100%/3) 100%, calc(100%/3) 0%, calc(100%/3) 100%; }
    66% { background-size: calc(100%/3) 100%, calc(100%/3) 100%, calc(100%/3) 0%; }
`;

// Styled component for the loader
const LoaderStyle = styled.div`
  width: 30px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side, #7c8299 90%, #0000);
  background: 
    var(--_g) 0%   50%, 
    var(--_g) 50%  50%, 
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 100%;
  animation: ${l7Animation} 1s infinite linear;
`;

// React component
const Loader = () => {
    return (
        <LoaderStyle />
    );
};

export default Loader;
