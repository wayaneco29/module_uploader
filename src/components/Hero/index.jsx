import React from 'react';

import Icon from '../Icon';
import Button from '../Button';

import styled from 'styled-components';

import UploadModal from './components/UploadModal';


const Div1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Div2 = styled.div`
    @media (max-width: 650px) {
        padding: 2rem 1.5rem !important;
    }
`;

const Hero = ({ user, title, hasUploadButton }) => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleToggleModal = () => setOpenModal(!openModal);

    return (
        <section className="hero">
            <Div2 className="hero-body">
                <div className="container">
                    <Div1>
                        <h1 className={`title ${title === 'tle' || title === 'mapeh' || title === 'epp' ? 'is-uppercase':'is-capitalized'}`} style={{ margin: 0, fontSize: '1.5rem' }}>
                            {title}
                        </h1>
                        {user && hasUploadButton ? (
                            <Button className="is-warning" onClick={handleToggleModal}><Icon className="mdi-upload" style={{ marginRight: '0px' }} /> UPLOAD {window.innerWidth < 481 ? '' : 'MODULE'}</Button>
                        ) : ''}
                    </Div1>
                </div>
            </Div2>
            {openModal && <UploadModal isOpen={openModal} closeModal={handleToggleModal} user={user} />}
        </section>
    )
}

export default Hero;