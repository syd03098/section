import { css, cx } from '@emotion/css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Option from './Option';
import SelectButton from './SelectButton';
import {
    getCurrentElementIndex,
    getValidOptionList,
    isEqualOptionElement,
} from './utils';

export interface OptionValue<T> {
    value: T;
    displayName?: string;
    disabled?: boolean;
}

export const Theme = {
    Primay: 'primary',
    Contrast: 'contrast',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export interface SelectProps<T> {
    className?: string;

    placeholder?: string;

    onChange?: (selectedValue: OptionValue<T>) => void;

    initialValue?: T;

    options: OptionValue<T>[];

    theme?: Theme;

    // not implemeneted yet
    native?: boolean;

    disabled?: boolean;
}

const Select = <T,>({
    className,
    placeholder = 'select...',
    onChange,
    initialValue,
    options,
    theme = Theme.Primay,
    native = false,
    disabled = false,
}: SelectProps<T>) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuListRef = useRef<HTMLDivElement>(null);

    // todo: remove this line
    if (native) {
        throw new Error('Native Select Component is not ready!');
    }

    const onClose = useCallback(() => {
        setOpen(false);
        setFocusedElement(undefined);
        buttonRef.current?.focus();
    }, []);

    const onClick = useCallback(() => {
        if (isOpen) {
            onClose();
        } else {
            setOpen(true);
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        const onClickOutside = ({ target: clicked }: MouseEvent) => {
            const target = clicked as HTMLElement;
            if (!isOpen) {
                return;
            }

            if (
                !(
                    buttonRef.current?.contains(target) ||
                    menuListRef.current?.contains(target)
                )
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [isOpen, onClose]);

    const [selectedOption, changeSelectedOption] = useState<
        OptionValue<T> | undefined
    >(() => {
        let element: OptionValue<T> | undefined;
        if (initialValue === undefined) {
            return undefined;
        }

        const optionList = getValidOptionList(options);
        optionList.forEach((option) => {
            if (JSON.stringify(option.value) === JSON.stringify(initialValue)) {
                element = option;
            }
        });

        return element;
    });

    const [focusedElement, setFocusedElement] = useState<
        OptionValue<T> | undefined
    >(undefined);

    const onSelectElement = useCallback(
        (element: OptionValue<T>) => {
            onChange?.(element);
            changeSelectedOption(element);

            onClose();
        },
        [onChange, onClose]
    );

    const clickOptionHandler = useCallback(
        (clicked: OptionValue<T>) => {
            const validOptionList = getValidOptionList(options);
            const clickedOption = validOptionList.find((option) =>
                isEqualOptionElement(option, clicked)
            );

            const isSelectable = !!clickedOption && !clickedOption.disabled;
            if (isSelectable) {
                onSelectElement(clickedOption);
            }
        },
        [onSelectElement, options]
    );

    useEffect(() => {
        const onFocusFirstElement = (list: OptionValue<T>[]) => {
            setFocusedElement(list[0]);
        };

        const onFocusLastElement = (list: OptionValue<T>[]) => {
            setFocusedElement(list[list.length - 1]);
        };

        const onFocusNextElement = (list: OptionValue<T>[]) => {
            const currentElementIndex = getCurrentElementIndex(
                list,
                focusedElement
            );

            setFocusedElement(list[currentElementIndex + 1]);
        };

        const onFocusPreviousElement = (list: OptionValue<T>[]) => {
            const currentElementIndex = getCurrentElementIndex(
                list,
                focusedElement
            );

            setFocusedElement(list[currentElementIndex - 1]);
        };

        const onKeydown = (event: KeyboardEvent) => {
            const currentFocusedElement = document.activeElement;
            const isFocusedOnComponent =
                menuListRef.current?.contains(currentFocusedElement) ||
                buttonRef.current?.contains(currentFocusedElement);

            const validOptionList = getValidOptionList(options);
            const firstElement = validOptionList[0];
            const lastElement = validOptionList[validOptionList.length - 1];

            if (!isFocusedOnComponent) {
                return;
            }

            switch (event.key) {
                case 'ArrowDown': {
                    if (!isOpen) {
                        return;
                    }
                    event.preventDefault();
                    if (
                        focusedElement === undefined ||
                        isEqualOptionElement(lastElement, focusedElement)
                    ) {
                        onFocusFirstElement(validOptionList);
                    } else {
                        onFocusNextElement(validOptionList);
                    }
                    break;
                }
                case 'ArrowUp': {
                    if (!isOpen) {
                        return;
                    }
                    event.preventDefault();
                    if (
                        focusedElement === undefined ||
                        isEqualOptionElement(firstElement, focusedElement)
                    ) {
                        onFocusLastElement(validOptionList);
                    } else {
                        onFocusPreviousElement(validOptionList);
                    }

                    break;
                }
                case 'Tab':
                case 'Escape': {
                    if (isOpen) {
                        onClose();
                    }
                    break;
                }
                case 'Enter': {
                    const isFocusedOnButton =
                        buttonRef.current === currentFocusedElement;

                    // prevent button's onClick handler
                    if (isOpen && !isFocusedOnButton) {
                        event.preventDefault();
                    }

                    if (focusedElement) {
                        onSelectElement(focusedElement);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        };

        if (native) {
            return;
        }

        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, [focusedElement, isOpen, native, options, onClose, onSelectElement]);

    return (
        <SelectButton
            ref={buttonRef}
            className={className}
            theme={theme}
            isOpen={isOpen}
            disabled={disabled}
            displayName={selectedOption?.displayName ?? placeholder}
            native={native}
            onClick={onClick}
        >
            {(() => {
                // todo: implement native option Component

                // if (native) {
                //     return options.map((option) => (
                //         <option
                //             key={JSON.stringify(option.value)}
                //             value={JSON.stringify(option.value)}
                //             selected={isEqualOptionElement(option, selectedOption)}
                //             disabled={option.disabled}
                //         >
                //             {option.displayName}
                //         </option>
                //     ));
                // }

                return (
                    <>
                        {isOpen && (
                            <div className={cx(popOverContainerStyle)}>
                                <div
                                    ref={menuListRef}
                                    className={cx([
                                        menuContainerStyle,
                                        {
                                            [css`
                                                background-color: #f9fbfe;
                                                border: 1px solid #4286f4;
                                            `]: theme === Theme.Primay,
                                        },
                                        {
                                            [css`
                                                background-color: white;
                                                box-shadow: 2px 2px 10px
                                                    rgba(0, 0, 0, 0.1);
                                            `]: theme === Theme.Contrast,
                                        },
                                    ])}
                                >
                                    <ul
                                        tabIndex={-1}
                                        className={cx([
                                            menuListStyleBase,
                                            css`
                                                max-height: ${theme ===
                                                Theme.Primay
                                                    ? '420px'
                                                    : '204px'};
                                            `,
                                        ])}
                                    >
                                        {options.map((option) => (
                                            <Option
                                                key={JSON.stringify(
                                                    option.value
                                                )}
                                                theme={theme}
                                                isSelected={isEqualOptionElement(
                                                    option,
                                                    selectedOption
                                                )}
                                                isFocused={isEqualOptionElement(
                                                    option,
                                                    focusedElement
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clickOptionHandler(option);
                                                }}
                                                option={option}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </>
                );
            })()}
        </SelectButton>
    );
};

const popOverContainerStyle = css`
    position: absolute;
    top: calc(100% + 4px);
    width: 100%;
    z-index: 1;
`;

const menuContainerStyle = css`
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    padding: 6px 0;
    border-radius: 8px;
`;

const menuListStyleBase = css`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
    outline: none;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #e2e2e2;
    }
`;

export default Select;
