import React from 'react';

import { useHistory, Link } from 'react-router-dom';
import { auth } from '../../firebase';

import Icon from '../Icon';

import styled from 'styled-components';

const DivStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const LinkStyle = styled(Link)`
    &:hover {
        background: rgb(119, 17, 37) !important;
        color: #eee !important;
    }
`;

const Navbar = ({ user, url }) => {
    const history = useHistory();

    const handleSignOut = async () => {
        await auth.signOut();

        history.push('/');
    }

    return (
        <nav className="navbar is-success" role="navigation" aria-label="main navigation" style={{ background: '#771125'}}>
            <DivStyle>
                <div className="navbar-brand" style={{ width: 'fit-content'}}>
                    <LinkStyle className="navbar-item" to={url}><Icon className="mdi-arrow-left" style={{ marginRight: '0px' }} />MACI</LinkStyle>
                </div>
                {user && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={user.photoURL}  style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ffdd57' }} />
                        <div style={{ padding: '0.5rem 0.75rem', cursor: 'pointer' }} onClick={handleSignOut}>SIGN OUT</div>
                    </div>
                )}
            </DivStyle>
        </nav>
    )
}

export default Navbar;