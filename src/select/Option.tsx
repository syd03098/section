import { css, cx } from '@emotion/css';
import React, {
    useLayoutEffect,
    useRef,
    MouseEvent as ReactMouseEvent,
} from 'react';
import { OptionValue, Theme } from './Select';

const Option = <T,>({
    theme,
    isSelected,
    onClick,
    isFocused,
    option: { disabled, displayName },
}: {
    theme: Theme;
    isSelected: boolean;
    onClick: (e: ReactMouseEvent<HTMLLIElement>) => void;
    isFocused: boolean;
    option: OptionValue<T>;
}) => {
    const optionRef = useRef<HTMLLIElement>(null);
    const isActive = isSelected || isFocused;

    useLayoutEffect(() => {
        if (isFocused) {
            optionRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <li
            ref={optionRef}
            tabIndex={-1}
            className={cx([
                optionItemStyleBase,
                {
                    [css({ cursor: 'default' })]: disabled,
                },
                {
                    [css`
                        padding: 6px 12px;
                        color: #777777;

                        ${!disabled &&
                        css`
                            &:hover {
                                color: #454649;
                                background-color: #f5f5f5;
                            }
                        `}

                        ${isActive &&
                        css`
                            color: #454649;
                            background-color: #f5f5f5;
                        `}

                        ${disabled &&
                        css`
                            color: rgba(0, 0, 0, 0.1);
                        `}
                    `]: theme === Theme.Contrast,
                },
                {
                    [css`
                        padding: 14px 16px;
                        color: #636363;

                        ${!disabled &&
                        css`
                            &:hover {
                                color: #4286f4;
                                background-color: #f5f7fa;
                            }
                        `}

                        ${isActive &&
                        css`
                            color: #4286f4;
                            background-color: #f5f7fa;
                        `}

                        ${disabled &&
                        css`
                            color: #bfbfbf;
                        `}
                    `]: theme === Theme.Primay,
                },
            ])}
            onClick={onClick}
        >
            {displayName}
        </li>
    );
};

const optionItemStyleBase = css`
    display: flex;
    align-items: center;
    outline: none;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: -0.02em;
`;

export default Option;
