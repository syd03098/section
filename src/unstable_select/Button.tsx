import React, { ReactNode } from 'react';
import { useSelect } from './SelectRoot';

const Button = ({
    disabled,
    children,
}: {
    disabled?: boolean;
    children: ReactNode;
}) => {
    const { buttonRef, setVisible } = useSelect('Button');

    return (
        <button ref={buttonRef} onClick={setVisible} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
