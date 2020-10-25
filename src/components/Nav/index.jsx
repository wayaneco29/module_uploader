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

const PopUpDiv = styled.div`
    position: absolute;
    background: #eee;
    padding: 1rem 0rem;
    top: 44px;
    border: 1px solid #771125;
    border-radius: 10px;

    &::before {
        position: absolute;
        content: '';
        border-bottom: 14px solid #eee;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        top: -9px;
        right: 26px;
    }

    & div {
        padding: 0.3rem 1rem;
        &:hover {
            background: rgb(119, 17, 37);
            color: #eee;
            cursor: pointer;
        }

        &::first-child {
            margin-bottom: 10px;
        }
    }
`;

const Navbar = ({ user, url, navigation }) => {
    const [openDropdown, setOpenDropdown] = React.useState(false);
    const history = useHistory();

    const handleOpen = () => setOpenDropdown(!openDropdown)

    const handleSignOut = async () => {
        await auth.signOut();

        history.push('/');
    }

    return (
        <nav className="navbar" style={{ background: '#771125'}}>
            <DivStyle>
                <div className="navbar-brand" style={{ width: 'fit-content'}}>
                    <LinkStyle className="navbar-item" to={url} style={{ color: '#eee'}}>{navigation}</LinkStyle>
                </div>
                {user &&
                    <div style={{ display: 'flex', alignItems: 'center', position:'relative' }}>
                         <div style={{ padding: '0.5rem 0.75rem', cursor: 'pointer', color: '#eee' }} onClick={handleOpen}>My Account</div>
                        {openDropdown && (
                            <PopUpDiv>
                                <div onClick={() => history.push('/profile')}>Profile</div>
                                <div onClick={handleSignOut}>Sign Out</div>
                            </PopUpDiv>
                        )}
                    </div>
                }
            </DivStyle>
        </nav>
    )
}

export default Navbar;