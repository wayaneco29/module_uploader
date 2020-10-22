import React from 'react';

import styled from 'styled-components';

const Div = styled.div`
    padding: 0.8rem 0rem;
    text-align: center;
    color: #eee;
    background: #771125;
    font-size: 13px;
`;

const Footer = () => {

    return (
        <Div>
            Made by: <a href="https://www.facebook.com/Wayandanyael" target="_blank" style={{ color: '#ffdd57'}}>Wayan Danyael Eco</a> &copy; 2020.
        </Div>
    )
}

export default Footer;