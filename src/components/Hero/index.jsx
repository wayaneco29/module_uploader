import React from 'react';

import Icon from '../Icon';
import Button from '../Button';

import styled from 'styled-components';

import UploadModal from './components/UploadModal';


const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Hero = ({ user, title, hasUploadButton }) => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleToggleModal = () => setOpenModal(!openModal);

    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
                    <Div>
                        <h1 className={`title ${title === 'tle' || title === 'mapeh' || title === 'epp' ? 'is-uppercase':'is-capitalized'}`} style={{ margin: 0 }}>
                            {title}
                        </h1>
                        {user && hasUploadButton ? (
                            <Button className="is-warning" onClick={handleToggleModal}><Icon className="mdi-upload" style={{ marginRight: '0px' }} /> UPLOAD {window.innerWidth < 481 ? '' : 'MODULE'}</Button>
                        ) : ''}
                    </Div>
                </div>
            </div>
            {openModal && <UploadModal isOpen={openModal} closeModal={handleToggleModal} user={user} />}
        </section>
    )
}

export default Hero;