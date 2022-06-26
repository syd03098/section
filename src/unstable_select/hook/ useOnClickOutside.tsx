import React, { RefObject, useEffect } from 'react';
import useEvent from '../../hook/useEvent';

const useOnClickOutside = (
    callback: () => void,
    permittedElements: (RefObject<HTMLElement> | null | undefined)[],
    enabled?: boolean
) => {
    const onClickOutside = useEvent(({ target }: MouseEvent) => {
        const clickedOutside = !permittedElements.every((ref) =>
            ref?.current?.contains(target as HTMLElement)
        );
        if (clickedOutside) {
            callback();
        }
    });

    useEffect(() => {
        if (enabled) {
            document.addEventListener('mousedown', onClickOutside);
            return () => {
                document.removeEventListener('mousedown', onClickOutside);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);
};

export default useOnClickOutside;
