import React from 'react';
import useEvent from './useEvent';

const useOnClickOutside = (
    callback: (event: MouseEvent) => void,
    permittedElements: (HTMLElement | null | undefined)[],
    enabled?: boolean
) => {
    const onClickOutside = useEvent((event: MouseEvent) => {
        const clickedOutside = !permittedElements.some((element) =>
            element?.contains(event.target as HTMLElement)
        );
        if (clickedOutside) {
            callback(event);
        }
    });

    React.useEffect(() => {
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
