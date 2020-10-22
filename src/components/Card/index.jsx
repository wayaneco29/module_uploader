import React from 'react';

import Icon from '../Icon';

import styled from 'styled-components';

const CustomDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const CustomCard = styled.div`
    height: 100%;
    cursor: pointer;
    transition: all 100ms ease;

    &:hover {
        transform: scale(1.03);
        background: #eee;
        box-shadow: rgba(0,0,0,0.5)
    }
`;

const Card = ({ title }) => {
    return (
        <CustomCard className="card">
            <CustomDiv className="card-content">
                <div className="title" style={{ margin: 0, fontSize: '24px' }}>{ title }</div>
                <div><Icon className="mdi-arrow-right" style={{ fontSize: '20px' }} /></div>
            </CustomDiv>
        </CustomCard>
    )
}

export default Card;