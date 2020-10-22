import React from 'react';

import Input from '../Input';

import styled from 'styled-components';

const ModalCardStyle = styled.div`
    width: 430px;

    @media (max-width: 481px) {
        width: 300px !important;
    }
`;

const Modal = ({ isOpen,title, closeModal, className, children, ...props }) => {
    const classes = ['modal', className].join(' ');

    return (
        <div className={`${classes} ${isOpen ? 'is-active' : '' }`} {...props }>
            <div className="modal-background" style={{ background: 'rgba(0,0,0,0.3)', padding: '15px 20px'}}/>
            <ModalCardStyle className="modal-card">
                <div className="modal-card-head" style={{ background: 'rgb(119, 17, 37)' }}>
                    <p className="modal-card-title" style={{ color: '#eee',fontSize: '16px' }}>{title}</p>
                    <button className="delete" aria-label="close" onClick={closeModal} />
                </div>
                { children }
            </ModalCardStyle>
        </div>
    )
}

const Content = ({ children }) => (
    <div className="modal-card-body">
        { children }
    </div>
);

const Action = ({ children }) => (
    <div className="modal-card-foot">
        { children }
    </div>
);

export { Action, Content, Modal as default };