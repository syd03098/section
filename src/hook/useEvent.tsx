import React, { useCallback, useLayoutEffect, useRef } from 'react';

type Fn<Args extends unknown[], R> = (...args: Args) => R;

const useEvent = <A extends unknown[], R>(fn: Fn<A, R>) => {
    const callbackRef = useRef<Fn<A, R>>(() => {
        throw new Error(
            `렌더링중에는 useEvent hook를 사용 할 수 없습니다. useEvent hook를 올바르게 호출하고있는지 확인하세요.`
        );
    });

    useLayoutEffect(() => {
        callbackRef.current = fn;
    }, [fn]);

    return useCallback((...args: A) => {
        return callbackRef.current(...args);
    }, []);
};

export default useEvent;
