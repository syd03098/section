import React from 'react';
import useEvent from './useEvent';

type Ref<T> =
    | React.MutableRefObject<T | null>
    | ((el: T | null) => void)
    | undefined
    | null;

const useMergedRefs = <T,>(...refs: Ref<T>[]) => {
    return useEvent((el: T | null) => {
        for (const ref of refs) {
            if (!ref) {
                continue;
            }

            if (typeof ref === 'function') {
                ref(el);
            } else {
                ref.current = el;
            }
        }
    });
};

export default useMergedRefs;
