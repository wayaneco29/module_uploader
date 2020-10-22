import React from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #c5c5c5;
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 50vh;
    margin-left: 50vw;
    transform: translate(-50%, -50%);
`;

const H1 = styled.h1`
    font-size: 10rem;
    position: absolute;
    z-index: -1;
    color: #958484;
    font-weight: bold;
`;

const P = styled.p`
    position: absolute;
    top: -22px;
    z-index: 1;
    font-size: 2.5rem;
    color: rgb(119, 17, 37);
    font-weight: 300;
`;

const NotFound = () => {
    const history = useHistory();

    return (
        <Container>
            <TextContainer className="text-container">
                <H1>404</H1>
                <P>NOT FOUND</P>
                <Button 
                style={{ 
                    position: 'absolute', 
                    top: '77px', zIndex: '1', 
                    padding: '1rem 2rem', 
                    background: 'rgb(119, 17, 37)', 
                    color: '#c5c5c5' 
                }}
                onClick={() => history.push('/')}
                >
                    GO BACK
                </Button>
            </TextContainer>
        </Container>
    )
}

export default NotFound;