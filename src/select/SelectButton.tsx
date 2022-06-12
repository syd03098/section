import { css, cx } from '@emotion/css';
import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import { Theme } from './Select';

const SelectButton = forwardRef<
    HTMLButtonElement | HTMLSelectElement,
    {
        className?: string;
        children: ReactNode;
        isOpen: boolean;
        theme: Theme;
        displayName: string;
        disabled: boolean;
        native: boolean;
        onClick: () => void;
    }
>(
    (
        {
            className,
            children,
            onClick,
            isOpen,
            theme,
            displayName,
            disabled,
            native,
        },
        ref
    ) => {
        // todo: implement native select component
        // if (native) {
        //     return (
        //         <select ref={ref as ForwardedRef<HTMLSelectElement>} onChange={onChange}>
        //             {children}
        //         </select>
        //     );
        // }

        return (
            <button
                ref={ref as ForwardedRef<HTMLButtonElement>}
                className={cx([
                    selectButtonStyleBase,
                    {
                        [css`
                            border: 1px solid #e2e2e2;
                            background-color: white;
                        `]: theme === Theme.Primay,
                    },
                    {
                        [css`
                            border: transparent;
                            background-color: #232527;
                            color: white;

                            font-size: 18px;
                            font-weight: bold;
                            line-height: 1.4;

                            &:disabled {
                                opacity: 0.3;
                            }
                        `]: theme === Theme.Contrast,
                    },
                    {
                        [css`
                            border: 1px solid #4286f4;
                            color: #4286f4;
                        `]: theme === Theme.Primay && isOpen,
                    },
                    className,
                ])}
                disabled={disabled}
                onClick={onClick}
            >
                <div className={buttonLayoutStyle}>{displayName}</div>
                {children}
            </button>
        );
    }
);

SelectButton.displayName = 'SelectButton';

const focusedElementStyle = css`
    &:not(:disabled):focus {
        box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #4286f4;
    }
`;

const selectButtonStyleBase = css`
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background-color: transparent;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    z-index: 0;

    &:disabled {
        cursor: default;
    }

    ${focusedElementStyle};
`;

const buttonLayoutStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    padding-left: 8px;
    padding-right: 12px;
`;

export default SelectButton;
