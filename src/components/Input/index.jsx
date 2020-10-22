import React from 'react';

const Input = ({ handleChange, className, hasIcon, ...props}) => {
    const classes = ['input', className]. join(' ');

    return (
        <div className="field">
            <div className={`control ${hasIcon ? 'has-icons-left' : ''}`}>
                <input className={classes} onChange={handleChange} {...props} />
                {hasIcon && (
                    <span className="icon is-small is-left">
                        <i className={`mdi ${hasIcon}`}></i>
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input;