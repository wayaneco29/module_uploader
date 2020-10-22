import React from 'react';

const Button = ({ className, children, ...props }) => {
    const classes = ['button', className].join(' ');

    return (
        <button className={classes} {...props}>
            { children }
        </button>
    )
}

export default Button;