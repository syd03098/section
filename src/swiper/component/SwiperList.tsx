import { css, cx } from '@emotion/css';
import React, {
    createContext,
    ReactNode,
    RefObject,
    useCallback,
    useMemo,
    useState,
} from 'react';
import usePrevious from '../../hook/usePrevious';

export interface SwiperSlide {
    value: string;

    ref: RefObject<HTMLButtonElement>;
}

export interface SwiperState {
    value: string;

    lastSelectedValue: SwiperSlide | undefined;

    sliders: Record<string, SwiperSlide>;

    onRegisterSlide: (slide: SwiperSlide) => void;

    onUnregisterSlide: (value: string) => void;

    onSelect: (newValue: string) => void;
}

/* eslint-disable @typescript-eslint/no-empty-function */
export const SwiperContext = createContext<SwiperState>({
    value: '',
    lastSelectedValue: undefined,
    sliders: {},
    onRegisterSlide: () => {},
    onUnregisterSlide: () => {},
    onSelect: () => {},
});

const SwiperList = ({
    className,
    value,
    onChange,
    children,
}: {
    className?: string;
    value: string;
    onChange: (newValue: string) => void;
    children: ReactNode;
}) => {
    const [slideList, setSlideList] = useState<SwiperState['sliders']>({});
    const lastSelectedValue = usePrevious(slideList[value]);

    const onRegisterSlide = useCallback<SwiperState['onRegisterSlide']>(
        (slide) => {
            setSlideList((prev) => ({
                ...prev,
                [slide.value]: slide,
            }));
        },
        []
    );

    const onUnregisterSlide = useCallback<SwiperState['onUnregisterSlide']>(
        (value) => {
            setSlideList((prev) => {
                const nextState = { ...prev };
                delete nextState[value];

                return nextState;
            });
        },
        []
    );

    const onSelect = useCallback<SwiperState['onSelect']>(
        (value) => {
            if (onChange) {
                onChange(value);
            }
        },
        [onChange]
    );

    const state = useMemo<SwiperState>(
        () => ({
            value,
            sliders: slideList,
            lastSelectedValue,
            onRegisterSlide,
            onUnregisterSlide,
            onSelect,
        }),
        [
            lastSelectedValue,
            onRegisterSlide,
            onSelect,
            onUnregisterSlide,
            slideList,
            value,
        ]
    );

    return (
        <SwiperContext.Provider value={state}>
            <div
                role="tablist"
                className={cx([
                    css`
                        position: relative;
                        display: flex;
                        align-items: center;
                        flex-wrap: nowrap;
                        overflow-x: auto;
                        gap: 1rem;

                        &::-webkit-scrollbar {
                            display: none;
                        }
                    `,
                    className,
                ])}
            >
                {children}
            </div>
        </SwiperContext.Provider>
    );
};

export default SwiperList;
