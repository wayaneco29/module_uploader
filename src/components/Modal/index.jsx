import React from 'react';

import Input from '../Input';

const Modal = ({ isOpen,title, closeModal, className, children, ...props }) => {
    const classes = ['modal', className].join(' ');

    return (
        <div className={`${classes} ${isOpen ? 'is-active' : '' }`} {...props }>
            <div className="modal-background" style={{ background: 'rgba(0,0,0,0.3)'}}/>
            <div className="modal-card" style={{ width: '400px' }}>
                <div className="modal-card-head" style={{ background: 'rgb(119, 17, 37)' }}>
                    <p className="modal-card-title" style={{ color: '#eee' }}>{title}</p>
                    <button className="delete" aria-label="close" onClick={closeModal} />
                </div>
                { children }
            </div>
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