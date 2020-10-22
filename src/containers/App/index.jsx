import React from 'react';

import { auth, store } from '../../firebase';

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
            if (user) {
                const { email, displayName, photoURL } = user;
                setUser({
                    email,
                    displayName,
                    photoURL,
                })
            } else {
                setUser(null);
            }
            
        })
    }, []);
 
    // React.useEffect(() => {
    //     const collectionRef = store.collection('modules/PP28US4d6VvdP16dpx7L/english').doc('SAfhIqlkJWPV7x2bzBV4');
    //     collectionRef.set({
    //         url: 4,
    //         name: 'Danty'
    //     }, { merge: true })
    // }, []);

    // const handleUser = () => {
    //     const userData = auth.currentUser;
    //     userData.updateProfile({
    //         displayName: 'Christine Mae Caleinte',
    //         photoURL: 'https://scontent.fmnl3-3.fna.fbcdn.net/v/t1.0-9/81724151_634997120581230_523014282351214592_n.jpg?_nc_cat=110&ccb=2&_nc_sid=8bfeb9&_nc_eui2=AeEHoJJsRv5Jo0vJMKc_lzLevCzanFvlMFy8LNqcW-UwXMiHu8mxOXh6nVq4mA2Kdkl_kTTBuUkxq2S-_vy6F5Ls&_nc_ohc=ImrQpvMOQAUAX-EmFDk&_nc_ht=scontent.fmnl3-3.fna&oh=eb70719abbba510be63187ad83da92f0&oe=5FB4F8CA',

    //     })
    // }

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