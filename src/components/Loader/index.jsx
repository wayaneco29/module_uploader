import React from 'react';

import styled from 'styled-components';

const SnipperContainer = styled.div`
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 52px;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    background: #000000d4;
    width: 100vw !important;
    height: calc(100vh - 52px);
`;

const Snipper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-left: 2px solid #cc0f35;
    border-bottom: 2px solid #cc0f35;
    border-right: 2px solid #cc0f35;
    border-top: 2px solid #dbdbdb;
    animation: spin 1.3s linear infinite;

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loader = () => (
    <SnipperContainer>
        <Snipper />
    </SnipperContainer>
)

export default Loader;