import React from 'react';

import Icon from '../Icon';

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
            All right reserved @ <span style={{ color: '#ffdd57'}}>Macrohon Institute Inc.</span> &copy; 2020.
        </Div>
    )
}

export default Footer;