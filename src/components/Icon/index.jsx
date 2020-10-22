import React from 'react';

export const Icon = ({ className, ...props }) => {
    const classes = ['mdi', className].join(' ');;
    return (
        <span className="icon" {...props}>
            <i className={classes} />
        </span>
    )
}

export default Icon;