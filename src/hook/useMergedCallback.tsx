import React from 'react';
import useEvent from './useEvent';

const useMergedCallback = <A extends unknown[]>(
    callback1?: (...args: A) => void,
    callback2?: (...args: A) => void
) => {
    return useEvent((...args: A) => {
        callback1?.(...args);
        callback2?.(...args);
    });
};

export default useMergedCallback;
