import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import useEvent from '../hook/useEvent';
import { useSelect } from './SelectRoot';

const useLatestRef = <T,>(
    ...refs: (
        | React.MutableRefObject<T | null>
        | ((instance: T) => void)
        | null
    )[]
) => {
    const cache = useRef(refs);

    useEffect(() => {
        cache.current = refs;
    }, [refs]);

    const mergedRef = useEvent((value: T) => {
        for (const ref of cache.current) {
            if (ref === null) {
                continue;
            }

            if (typeof ref === 'function') {
                ref(value);
            } else {
                ref.current = value;
            }
        }
    });

    return refs.every(
        (ref) => ref === null || (typeof ref === 'function' && !ref)
    )
        ? undefined
        : mergedRef;
};

const OptionList = ({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) => {
    const {
        isOpen,
        optionListRef: forwaredRef,
        buttonRef,
    } = useSelect('OptionList');

    const optionRefInternal = useRef<HTMLUListElement | null>(null);
    const optionListRef = useLatestRef(forwaredRef, optionRefInternal);

    const onClick = useEvent((event: React.MouseEvent<HTMLUListElement>) => {
        event.stopPropagation();

        if (buttonRef.current) {
            buttonRef.current.focus();
        }
    });

    return (
        <>
            {isOpen && (
                <ul
                    ref={optionListRef}
                    className={className}
                    tabIndex={-1}
                    onClick={onClick}
                >
                    {children}
                </ul>
            )}
        </>
    );
};

export default OptionList;
