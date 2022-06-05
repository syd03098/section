import React from 'react';
import { cx, css } from '@emotion/css';

const Button = () => {
    return (
        <button
            className={cx([
                css`
                    color: #231223;
                    background-color: #fafafa;
                    border: 1px solid #e2e2e2;
                    border-radius: 4px;
                    padding: 0.5rem;
                    outline: none;

                    &:focus {
                        box-shadow: 0 0 0 2px white, 0 0 0 4px #4286f4;
                    }
                `,
            ])}
            type="button"
            onClick={() => {
                console.debug('clicked');
            }}
        >
            hello
        </button>
    );
};

export default Button;
