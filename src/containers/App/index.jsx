import React from 'react';

import { Link } from 'react-router-dom';

import LoginModal from './components/Modal';
import Icon from '../../components/Icon';

import styled from 'styled-components';

import img from '../../image/maci.png';

const Divider = styled.div`
  margin-top: 2rem;
`;

const Div = styled.div`
    display: flex;

    & .button:first-child {
        margin-right: 16px;
    }
`;

const Banner = () => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleToggleModal = () => setOpenModal(!openModal);

    return (
    <React.Fragment>
        <div className="App">
            <header className="App-header">
                <img src={img} />
                <Divider />
                <h1>MACROHON INSTITUTE INC. MODULE SYSTEM</h1>
                <Divider />
                <Div>
                    <button className="button is-warning" onClick={handleToggleModal}>
                        <Icon className="mdi-teach"style={{ marginRight: '0px' }} />
                        TEACHER
                    </button>
                    <Link className="button is-warning" to="/dashboard">
                        <Icon className="mdi-account"style={{ marginRight: '0px' }} />
                        STUDENT
                    </Link>
                    {/* <button onClick={handleUser}>Test</button> */}
                </Div>
            </header>
        </div>
        <LoginModal title="Login" isOpen={openModal} closeModal={handleToggleModal} />
    </React.Fragment>
    )
}

export default Banner;