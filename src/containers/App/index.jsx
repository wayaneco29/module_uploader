import React from 'react';

import { auth } from '../../firebase';

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
    const [user, setUser] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);

    const handleToggleModal = () => setOpenModal(!openModal);

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
        })
    }, []);

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
                </Div>
            </header>
        </div>
        <LoginModal title="Login" isOpen={openModal} closeModal={handleToggleModal} />
    </React.Fragment>
    )
}

export default Banner;